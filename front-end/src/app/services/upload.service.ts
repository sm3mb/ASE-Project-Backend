import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadResume(data) {
    //let userId = sessionStorage.getItem("res-session");
    // let uploadData = {
    //   userId : sessionStorage.getItem("res-session"),
    //   data : data
    // }
    return this.http.post<any>('http://localhost:3000/uploadfile', data);
  }
}
