import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  private jobsFormData = new BehaviorSubject<any>({});
  updatedJobsFormData = this.jobsFormData.asObservable();
   
   updateFormData(data){
     this.jobsFormData.next(data); 
   }

  getResumeTechnologies(data){
    console.log('data....', data);
    let body = { id : data };
    return this.http.post('http://localhost:3000/jobs/technologies',body);
  }

  getJobs() { 
    return this.http.get('http://localhost:3000/jobs');
  }

  getCustomJobs(data) {
    let body = { url : data };
    return this.http.post('http://localhost:3000/jobs/custom',body);
  }

  getJobDescription(data) { 
    console.log('data in service file', data);
    let body = { link : data };
    return this.http.post('http://localhost:3000/jobs/description',body);
  }
}
