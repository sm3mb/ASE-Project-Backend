import { CarrerService } from './../services/carrer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrer',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.css']
})
export class CarrerComponent implements OnInit {

  openings;
  carrerOpenings;
  topCompanies;
  topSalaries;
  Values;
  keeys;
  constructor(private carrerService: CarrerService) { }

  ngOnInit() {

    this.carrerService.getCarrersData().subscribe( res => {
      this.carrerOpenings = res;
      //console.log('This is carrers data.......', res);
    });

    this.carrerService.getTopCompanies().subscribe( res => {
      this.topCompanies = res;
      this.keeys = Object.keys(this.topCompanies);
      this.Values = Object.values(this.topCompanies);
  });

    this.carrerService.getTopSalaries().subscribe( res => {
      this.topSalaries = res;
      //console.log('This is Top salaries data.......', res);
    });

  }

  openSalaryLink(url) {
    window.open(url);
  }

}
