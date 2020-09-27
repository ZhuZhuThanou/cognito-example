import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
    this.authService = authService;
   }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
  }

}
