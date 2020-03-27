import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getJobs() { 
    return this.http.get('http://localhost:3000/jobs');
  }

  getJobDescription(data) { 
    console.log('data in service file', data);
    let body = { link : data };
    return this.http.post('http://localhost:3000/jobs/description',body);
  }
}
