import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrerService {

  constructor(private http: HttpClient) { }

  getCarrersData() { 
    return this.http.get('http://localhost:3000/carrer/stats');
  }

  
  getTopCompanies() { 
    return this.http.get('http://localhost:3000/carrer/topcompanies');
  }

  getTopSalaries() { 
    return this.http.get('http://localhost:3000/carrer/topsalaries');
  }
}
