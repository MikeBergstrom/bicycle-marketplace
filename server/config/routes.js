var users = require('../controllers/users.js')
var bicycles = require('../controllers/bicycles.js')
var path = require('path')

module.exports = function(app) {

    app.post('/register', users.register )

    app.post('/login', users.login)

    app.get('/logout', users.logout)

    app.get('/get_user', users.get_user)

    app.post('/addBike', users.addBike)

    app.post('/updateBike', users.updateBike)

    app.post('/deleteBike', users.deleteBike)

    app.get('/getBikes', users.getBikes)
    // app.get('/bicycles', function(req,res, next){
    //     console.log("in team route")
    //     bicycles.show(req,res, next);
    // });

    // app.post('/bicycles/create', function(req, res, next) {
    //     console.log("in player create route")
    //     console.log(req.body)
    //     bicycles.add(req, res, next);
    // })

    // app.post('/bicycles/update', function(req, res, next) {
    //     bicycles.update( req, res, next)
    // })

    // app.post('/bicycles/delete', function(req, res, next) {
    //     console.log("player delete route", req.body)
    //     bicycles.delete( req, res, next)
    // })
    // app.get('/current', bicycles.current)

    // app.get('/reset', bicycles.reset)

    app.all('*', (req,res,next) => {
        console.log("in root route.js")
        res.sendfile(path.resolve("./bike/dist/index.html"))
    })
}   