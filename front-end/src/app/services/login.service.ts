import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { } 

  private userLoggedin = new BehaviorSubject<boolean>('');
  update = this.userLoggedin.asObservable();

  loggedIn(value){
    this.userLoggedin.next(value); 
  }

  login(userData) {
    return this.http.post('http://localhost:3000/login',userData);
  }
}
