import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { User } from '../user'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  login_user = new User()
  register_error = false;
  login_error = {status:false, message:{}};
  bikes = [];
  index = 0;
  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
    this._apiService.getBikes()
    .then( bikes => {this.bikes = bikes; console.log("component login get bikes success"); this.index=Math.floor(Math.random()*(this.bikes.length)); console.log(this.index)})
    .catch( () => {console.log("bike get error component"); this._router.navigate(['/'])})
    
  }

  register(){
    console.log(this.user)
    this._apiService.register(this.user)
    .then( () => {console.log("component success"); this._router.navigate(['bikes'])})
    .catch( err => {console.log("fail in login component register ", err); this.register_error = true;})
    this.user = new User();
  }


  login(){
    console.log("login attempt", this.login_user)
    this._apiService.login(this.login_user)
    .then(() => {console.log("login success in componnent"); this._router.navigate(['bikes'])})
    .catch(err => {console.log("login fail component", err); this.login_error.status = true; this.login_error.message=err})

  }

}
