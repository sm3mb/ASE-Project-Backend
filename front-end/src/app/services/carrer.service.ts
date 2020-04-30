import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerService {

  constructor(private http: HttpClient) { }

  private carrerSearchValue = new BehaviorSubject<any>('United States');
  updatedcarrerSearchValue = this.carrerSearchValue.asObservable();
   
   updatecarrerSearchValue(data){
     this.carrerSearchValue.next(data); 
   }

   private carrerJobLink = new BehaviorSubject<any>('');
   updatedcarrerJobLink = this.carrerJobLink.asObservable();
   
   updatecarrerJobLink(data){
     this.carrerJobLink.next(data); 
   }


  getCarrersData(value) { 
    let body = { data : value };
    return this.http.post('http://localhost:3000/carrer/stats', body);
  }

  
  getTopCompanies(value) { 
    let body = { data : value };
    return this.http.post('http://localhost:3000/carrer/topcompanies', body);
  }

  getTopSalaries(value) { 
    let body = { data : value };
    return this.http.post('http://localhost:3000/carrer/topsalaries', body);
  }
}
