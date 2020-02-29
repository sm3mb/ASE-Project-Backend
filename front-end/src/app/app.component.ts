import { TestService } from './../services/test.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  firstname: string;
  lastname: string;

  constructor(private testService: TestService) {}

  onSubmit() {
    let user = {
      'firstname' : this.firstname,
      'lastname' : this.lastname
    }
    
    this.testService.saveUser(user).subscribe(res =>{
      console.log('User Save response', res);
    });
  }
}
