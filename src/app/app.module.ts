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
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';

import { AuthenticationService } from './authentication/authentication.service';

// need to externalize these variables
// Amplify.configure({Auth: {
//   identityPoolId: 'ca-central-1:x',
//   region: 'ca-central-1',
//   userPoolId: 'ca-central-1_x',
//   userPoolWebClientId: 'x'
// }});


// Pool id: ca-central-1_bFigD5skb
// Client id: 1dt5aeufbdvsb34vlm48t33g6q
// ID Provider: "ca-central-1:108b10ed-229c-4436-a6d9-8cdcfe7253bd", // Identity pool ID

// Amplify.configure({Auth: {
//   identityPoolId: 'ca-central-1:6e7965ee-4561-4c18-9dfe-e7e631c1c75b',
//   region: 'ca-central-1',
//   userPoolId: 'ca-central-1_tlFi8fjdb',
//   userPoolWebClientId: '2d0goqvj9uvd2upiqg5ubopfjg'
// }});

// email only
// Amplify.configure({Auth: {
//   identityPoolId: 'ca-central-1:108b10ed-229c-4436-a6d9-8cdcfe7253bd',
//   region: 'ca-central-1',
//   userPoolId: 'ca-central-1_bFigD5skb',
//   userPoolWebClientId: '1dt5aeufbdvsb34vlm48t33g6q'
// }});


// one time password
// Amplify.configure({Auth: {
//   identityPoolId: 'ca-central-1:e6565b75-d02a-4a3e-9f5e-a7f8af788e15',
//   region: 'ca-central-1',
//   userPoolId: 'ca-central-1_el6LljUrF',
//   userPoolWebClientId: '2j8ddfps6l10sfk7amrfraki1g'
// }});

Amplify.configure({Auth: {
  identityPoolId: 'ca-central-1:e091aaaa-5fd9-4c3f-a329-ba5a0e27c7ef',
  region: 'ca-central-1',
  userPoolId: 'ca-central-1_QS1tLJWCb',
  userPoolWebClientId: '4ur0lnni6uapmff2fq7vfr0v8r'
}});



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    HomeComponent,
    VerifyEmailComponent,
    ChangePasswordComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
