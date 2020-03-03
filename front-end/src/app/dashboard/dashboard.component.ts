import { LoginService } from './../services/login.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  resumeFile: File | null;
  rawData: string;
  isLoggedin;
  
  constructor(public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit() {
    this.check = sessionStorage.getItem("res-session");
    console.log('check in nav bar.....', this.check);
    if(this.check != undefined) { 
      this.isLoggedin = true;
    } else { 
      this.isLoggedin = false;
    }
    
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

}
