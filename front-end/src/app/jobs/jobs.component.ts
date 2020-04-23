import { JobDescriptionComponent } from './../job-description/job-description.component';
import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from './../services/jobs.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  jobsData;
  jobDescription;
  resumeTechnologies;
  url;
  @Input('formValue') formValue: any;

  constructor(private jobsService : JobsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    let id = sessionStorage.getItem("res-session");
    this.jobsService.getResumeTechnologies(JSON.parse(id).token).subscribe( res => {
      console.log('Technologies fro resue.......type@@@@@@@@@@',typeof(res) );
      if(res[0]){
        this.resumeTechnologies = res[0].technologies;
      if(this.resumeTechnologies.length != 0) {
        this.url = 'https://www.indeed.com/jobs?q=';
        this.resumeTechnologies.forEach(item =>{
          this.url += '+' + item;
        })
        this.jobsService.getCustomJobs(this.url).subscribe(jobs => {
          console.log('custo..... jobs#####', jobs);
          this.jobsData = jobs;
        })
      } else {
        this.getDefaultJobs();
      }
      console.log('jobs this.url22222............', this.url);
      } else {
        this.getDefaultJobs();
      }
    })

    this.jobsService.updatedJobsFormData.subscribe(res => {
      console.log('for value@@@@######', res);
      if(res.jobKeywords != undefined) {
        this.getSearchedJobs(res);
      }
    })
  }

  getDefaultJobs() {
    this.jobsService.getJobs().subscribe(res => {
      console.log('jobs............', res);
      this.jobsData = res;
    })
  }

  getSearchedJobs(data) {
    this.url = 'https://www.indeed.com/jobs?q=';
    let searchString = data.jobKeywords.toString().split(", ");
    console.log('11111111111search string......', searchString);
    this.url += searchString;
    if(data.location != undefined) {
      this.url += '&l=' + data.location;
    }
    console.log('url in searched jobs############ searched form $$$$$$$', this.url);
    this.jobsService.getCustomJobs(this.url).subscribe(res => {
      console.log('for value@@@@###### in jobs coponent@@@@@@@', res);
      this.jobsData = res;
    })
  }

  getDescription(job) {
    console.log('job job @@@@@@@@@', job.link);
    this.jobsService.getJobDescription(job.link).subscribe( res => {
      this.jobDescription = res;
      console.log('jobs data............', this.jobsData);
      job['description'] = this.jobDescription
      // let presentJobData = {
      //   jobData: job,
      //   description: this.jobDescription
      // }

      let dialogRef = this.dialog.open(JobDescriptionComponent, {
        width: '600vw',
        height: '500vw',
        data: job
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('after closed jobs data............', this.jobsData);
      });
    })
  }

}
