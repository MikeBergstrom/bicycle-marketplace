import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { User } from '../user'
import { Bicycle } from '../bicycle'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  bike = new Bicycle();
  user = new User();

  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
    this.getUser()
  }

  add(){
    console.log("in add function component")
    this._apiService.addBike(this.bike)
    .then( () => {this.getUser()})
    .catch(() => {console.log("bike add error component")})
  }
  getUser(){
    this._apiService.getUser()
    .then( user => {this.user = user; console.log("comp got user", this.user)})
    .catch(() => {console.log("no user comp"); this._router.navigate(['/'])})
  }
  update(idx){
    console.log("in update function")
    console.log(this.user.bicycles[idx])
    this._apiService.updateBike(this.user.bicycles[idx])
    .then( user => {this.user = user})
    .catch( () => {console.log('bike update error')})
  }
  delete(bike){
    console.log("in delete function componnent", bike)
    this._apiService.delete(bike)
    .then( () => {console.log("in dleete then");this.getUser(); this._router.navigate(['/manage'])})
    .catch( () => {console.log("delet fail component")})
  }

}
