import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private _http:Http) { }

  register(user){
    console.log("api service register", user)
    return this._http.post('/register', user)
    .map(data => data.json())
    .toPromise();
  }

  login(user){
    console.log("api service login", user)
    return this._http.post('/login', user)
    .map(data => data.json())
    .toPromise();
  }

  getUser(){
    console.log("api service get user")
    return this._http.get('/get_user')
    .map(data => data.json())
    .toPromise();
  }

  addBike(bike){
    console.log("api service add bike")
      return this._http.post('/addBike', bike )
      .map(data => data.json())
      .toPromise();
    }

  updateBike(bike){
    console.log("api service update bike")
    return this._http.post('/updateBike', bike)
    .map(data => data.json())
    .toPromise();
  }

  delete(id){
    console.log("delete function api service")
    return this._http.post('/deleteBike', id)
    .map(data => data.json())
    .toPromise();
  }

  getBikes(){
    console.log("api service get bikes")
    return this._http.get('/getBikes')
    .map(data => data.json())
    .toPromise();
  }
}