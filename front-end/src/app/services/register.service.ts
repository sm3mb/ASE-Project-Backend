import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { } 

  saveUser(registerData) { 
    return this.http.post('http://localhost:3000/register',registerData);
  }
}
