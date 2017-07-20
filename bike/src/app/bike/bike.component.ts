import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { User } from '../user'
import { Bicycle } from '../bicycle'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
  bikes = [];
  user = new User();
  search = {term:""}
  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
    this._apiService.getBikes()
    .then( bikes => {this.bikes = bikes; console.log("component get bikes success", this.bikes)})
    .catch( () => {console.log("bike get error component"); this._router.navigate(['/'])})
    this._apiService.getUser()
    .then( user => {this.user = user; console.log("comp got user", this.user)})
    .catch(() => {console.log("no user comp"); this._router.navigate(['/'])})

  }

  show(bike){
    alert("Name: " + bike._user.first_name + bike._user.last_name + "    Email: " + bike._user.email)
  }

}
