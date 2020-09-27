import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor() { 
    console.log(this.user);
  }

  ngOnInit(): void {
  }

  public doLogin(): void {
    console.log('login');
  }

}
