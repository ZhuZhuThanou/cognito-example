import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  user = {
    currentPassword: '',
    newPassword: ''
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  setNewPassword(): void {
    console.log(this.user.newPassword);
    this.authService.changePassword(this.user.currentPassword, this.user.newPassword);
  }
}
