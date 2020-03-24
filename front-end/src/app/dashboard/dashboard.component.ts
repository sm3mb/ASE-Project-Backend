import { LoginService } from './../services/login.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  resumeFile: File | null;
  rawData: string;
  isLoggedin;
  check;
  
  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit() {
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

  }

  ngDoCheck() {
    if(this.check != undefined) { 
      this.isLoggedin = true;
    } else { 
      this.isLoggedin = false;
      this.router.navigate['/login'];
    }
  }
}
