import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { } 

  private userLoggedin = new BehaviorSubject<boolean>(false);
  update = this.userLoggedin.asObservable();

  loggedIn(value){
    this.userLoggedin.next(value); 
  }

  login(userData) {
    return this.http.post('http://localhost:3000/login',userData);
  }

  logOut() {
    sessionStorage.removeItem("res-session");
    this.router.navigate(['/login']);
  }
}
