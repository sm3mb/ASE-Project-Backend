import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  saveUser(userData) {
    return this.http.post('http://localhost:3000/sample/check',userData);
    // return this.http.get('http://localhost:3000/sample/test',userData);
  }
}
