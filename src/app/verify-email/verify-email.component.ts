import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user = {
    confirmCode: ''
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  verifyEmail(): void {
    this.authService.verifyCurrentUserEmail();
  }

  verifyCurrentUserEmailCode(): void {
    console.log('verifyCurrentUserEmailCode', this.user.confirmCode)
    this.authService.verifyCurrentUserEmailCode(this.user.confirmCode);
  }


}
