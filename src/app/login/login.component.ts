import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
    mfaCode: ''
  };

  constructor(private authService: AuthenticationService) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

  doLogin(): void {
    console.log('login');
    this.authService.logIn(this.user.email, this.user.password);
  }

  doMFAVerify(): void {
    this.authService.confirmLogIn(this.user.mfaCode);
  }

  doResendMFACode(): void {
    this.authService.logIn(this.user.email, this.user.password);
  }
}
