var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bicycle = mongoose.model('Bicycle');
mongoose.Promise = global.Promise
var session = require('express-session')

module.exports = {

    register: function(req, res, next){
        console.log("in register controller function")
        User.findOne({email: req.body.email})
            .then( user => {
                if(user){
                    console.log("found user")
                    res.status(500).json("found user")
                } else {
                    console.log("in controller else")
                    let newUser = new User(req.body)
                    newUser.save()
                        .then(() => {
                            req.session.id = newUser.id
                            res.json(true)
                        })
                        .catch(err => res.status(500).json(err),req.session.fails)
                }
            })
    },
    
    login: function(req, res, next){
        console.log("in login function ************************")
        if(!req.session.fails){
            req.session.fails = 0;
        }
        let nowtime = Date.now()
        if(req.session.fails == 5){
            console.log("in fails equal 5")
            req.session.timer = Date.now()
            req.session.fails++
            console.log(req.session.timer)
            console.log(req.session.timer > (req.session.timer - (60*60*1000)))
            res.status(500).json(req.session.fails)
        } else if (nowtime < (req.session.timer+(60*1000))){
            console.log("in else if nowtime less than")
            req.session.fails++;
            res.status(500).json(req.session.fails)
        } else {
            console.log("in else")
            User.findOne({email: req.body.email})
            .then( user => {
                if(!user){
                    req.session.fails++;
                    console.log("no user controller")
                    res.status(500).json(req.session.fails)
                } else {
                    if(user.password != req.body.password){
                        console.log("bad password")
                        res.status(500).json(req.session.fails)
                    } else {
                        console.log("login success controller");
                        console.log(user._id);
                        req.session.logid = user._id;
                        res.json(true);
                        console.log(req.session.logid);
                    }
                }
            })
        }
    },

    get_user: function(req, res, next){
        console.log("in get user controller")
        console.log(req.session.logid)
        let found_user = User.findOne({_id: req.session.logid})
        .then( user => {
            if(!user){
                console.log("no logged in user")
                res.status(500).json(false)
            } else {
                console.log("found logged user");
                User.findOne({_id: req.session.logid})
                    .populate('bicycles')
                    .exec(function(err, popuser){
                    console.log("sending user")
                    res.json(popuser)
                    })
                }
        })
        
    },

    addBike: function(req, res, next){
        User.findOne({_id:req.session.logid}, function(err, user){
        let newBike = new Bicycle(req.body)
        newBike._user = user._id;
        newBike.save()
            .then(() => {
                console.log("bike saved")
                user.bicycles.push(newBike)
                user.save(function(err){
                    if(err){
                        res.json(false)
                    } else {
                        res.json(user)
                    }
                })
            })
        })
    },

    updateBike: function(req, res, next){
        console.log(req.body._id)
        console.log('updatebike controller')
        Bicycle.findOne({_id:req.body._id})
            .then( bike => {bike.title = req.body.title;
            bike.image = req.body.image;
            bike.description = req.body.description;
            bike.price = req.body.price;
            bike.location = req.body.location;
            bike.save()
            })
            .catch(() => {console.log("didnt find bike inupdate controller")})
    },

    deleteBike: function(req,res,next){
        console.log("controller delete", req.body._id)
        Bicycle.remove({_id:req.body._id})
        .then(() => {console.log("delete controller success"); res.json(true)})
        .catch(() => {console.log("delete control fail")})
    },

    getBikes: function(req,res,next){
        console.log("in get bikes controller")
        Bicycle.find()
            .populate('_user')
            .exec(function(err, popbikes){
            console.log("sending bikes")
            res.json(popbikes)
            })
    },

    logout: function(req, res, next){
        console.log("controller log off ")
        req.session.destroy()
        res.redirect('/')
    }

}