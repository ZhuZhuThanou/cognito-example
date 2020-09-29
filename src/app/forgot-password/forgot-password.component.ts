import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user = {
    email: '',
    newPassword: '',
    code: ''
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  sendForgotPasswordForEmail(): void {
    console.log('sendForgotPasswordForEmail', this.user.email);
    this.authService.forgotPasswordForEmail(this.user.email);
  }

  sendCodeAndNewPassword(): void {
    console.log('sendCodeAndNewPassword', this.user.newPassword, this.user.code);
    this.authService
      .forgotPasswordSendCodeAndNewPassword(this.user.email, this.user.code, this.user.newPassword);
  }
}
