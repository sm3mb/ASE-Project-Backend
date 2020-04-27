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
  searchValue;

  constructor(private carrerService: CarrerService) { }

  ngOnInit() {

    this.carrerService.updatedcarrerSearchValue.subscribe(res => {
      console.log("This is value in carrer component.........", res);
      this.searchValue = res;
      this.getCarrersData();
    });

  }

  getCarrersData() {
    this.carrerService.getCarrersData(this.searchValue).subscribe( res => {
      this.carrerOpenings = res;
      console.log('This is carrers data.......', res);
    });

    this.carrerService.getTopCompanies(this.searchValue).subscribe( res => {
      this.topCompanies = res;
      console.log('This is Top companies data.......', res);
      this.keeys = Object.keys(this.topCompanies);
      this.Values = Object.values(this.topCompanies);
  });

    this.carrerService.getTopSalaries(this.searchValue).subscribe( res => {
      this.topSalaries = res;
      console.log('This is Top salaries data.......', res);
    });
  }

  openSalaryLink(url) {
    window.open(url);
  }

}
