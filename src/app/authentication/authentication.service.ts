import { Injectable } from '@angular/core';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUserTemp: any;
  private isRegisteredSuccess: BehaviorSubject<boolean>;
  
  private congitoUser: CognitoUser;
  private isLoggedIn: BehaviorSubject<boolean>;
  
  constructor() {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isRegisteredSuccess = new BehaviorSubject<boolean>(false);
   }

  setLoggedIn(isLoggedIn): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getUserId(): string {
    if (this.congitoUser) {
      return this.congitoUser.getUsername();
    } else {
      return '';
    }
  }

  async registerUser(username: string, password: string, phoneNumber: string): Promise<any> {
    try {
        console.log('signUp: ', username, password, phoneNumber);
        this.registerUserTemp = await Auth.signUp({
            username,
            password,
            attributes: {
              phone_number: phoneNumber   // optional - E.164 number convention
            }
        });
        console.log(this.registerUserTemp);
        console.log('next step: prompt the user to enter the confirmation code from the phone');
    } catch (error) {
        console.log('error signing up:', error);
    }
}


  async resendRegistrationConfirmationCode(userName): Promise<any>{
    try {
        await Auth.resendSignUp(userName);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
  }

  async confirmRegisteredUser(username: string, code: string): Promise<any> {
    try {
      console.log('confirmRegisteredUser: ', username, code);
      let item = await Auth.confirmSignUp(username, code);
      console.log('confirmRegisteredUser return value: ', item);
      console.log('next step: redirect the user to login to the session');
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  }

  async logIn(userName: string, password: string): Promise<any> {
      try {
          this.congitoUser = await Auth.signIn(userName, password);
          console.log(this.congitoUser);
      } catch (error) {
          console.log('error signing in', error);
          this.setLoggedIn(false);
      }
  }

  async confirmLogIn(mfaCode: string): Promise<any> {
    if (this.congitoUser && this.congitoUser.getSignInUserSession() === null) {
      try {
        console.log('MFA Code: ', mfaCode);
        this.congitoUser = await Auth.confirmSignIn(this.congitoUser, mfaCode);
        console.log('code confirmed', this.congitoUser);
        this.setLoggedIn(true);
      } catch (error) {
          console.log('error confirming sign up', error);
          this.setLoggedIn(false);
      }
    }
  }

  /**
   * revoking all the auth tokens (id token, access token and refresh token)
   * which means the user is signed out from all the devices.
   */
  async logOut(): Promise<any> {
    try {
        await Auth.signOut({ global: true });
        this.setLoggedIn(false);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}



