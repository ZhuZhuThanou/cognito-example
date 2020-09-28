import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HomeComponent } from './home/home.component';

need to externalize these variables
Amplify.configure({Auth: {
  identityPoolId: 'ca-central-1:x',
  region: 'ca-central-1',
  userPoolId: 'ca-central-1_x',
  userPoolWebClientId: 'x'
}});




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
