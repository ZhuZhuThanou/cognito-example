import { Injectable } from '@angular/core';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private congitoUser: CognitoUser;
  private isLoggedIn: BehaviorSubject<boolean>;


  constructor() {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
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



