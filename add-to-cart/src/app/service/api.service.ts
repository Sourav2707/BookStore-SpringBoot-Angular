import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080/bookstore/';
  isLoggedIn = false;

  constructor(private http : HttpClient) { }
  login(payload : any) : Observable<any> {
    return this.http.post(this.baseUrl+'login', payload, {observe: 'response'});
  }
  register(payload : any) : Observable<any> {
    return this.http.post(this.baseUrl+'register', payload, {observe: 'response'});
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  loggedIn() {
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
  }
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
}
