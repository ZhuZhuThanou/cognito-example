import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'cognito-example';
  loggedIn = false;
  authSubscription: Subscription;

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.authSubscription = this.service.getLoggedIn().subscribe(value => {
      this.loggedIn = value;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
