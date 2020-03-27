import { JobsService } from './../services/jobs.service';
import { LoginService } from './../services/login.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginForm: FormGroup;
  resumeFile: File | null;
  rawData: string;
  isLoggedin;
  check;
  jobsData;
  
  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private loginService: LoginService, private jobsService : JobsService) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', [Validators.required]],
    //  email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
    this.check = sessionStorage.getItem("res-session");
    console.log('check in nav bar.....', this.check);
    
    
    this.loginService.loggedIn(this.isLoggedin);
    
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { data: this.resumeFile}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed...........',result);
      this.rawData = result;
    });

    this.jobsService.getJobs().subscribe(res => {
      console.log('jobs............', res);
      this.jobsData = res;
    })
  }

  findJobs(){


  }

  getDescription(link) {
    this.jobsService.getJobDescription(link).subscribe(res => {
      console.log('jobs............', res);
      //this.jobsD = res;
    })
  }

  
  // ngDoCheck() {
  //   if(this.check != undefined) { 
  //     this.isLoggedin = true;
  //   } else { 
  //     this.isLoggedin = false;
  //     this.router.navigate['/login'];
  //   }
  // }
}
