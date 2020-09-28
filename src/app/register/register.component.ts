import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    mfaCode: ''
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  doRegister(): void {
    this.authService.registerUser(this.user.email, this.user.password, this.user.phoneNumber);
  }

  doConfirmationCodeVerify(): void {
    this.authService.confirmRegisteredUser(this.user.email, this.user.mfaCode);
  }

  doResendConfirmationCode(): void {
    this.authService.resendRegistrationConfirmationCode(this.user.email);
  }
}
