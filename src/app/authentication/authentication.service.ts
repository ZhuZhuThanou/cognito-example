import { Injectable } from '@angular/core';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// const httpOptions = {
//   headers: new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:4200'})
// };

const url = 'https://pspzvrwe5b.execute-api.ca-central-1.amazonaws.com/dev/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUserTemp: any;
  private isRegisteredSuccess: BehaviorSubject<boolean>;

  private congitoUser: CognitoUser;
  private isLoggedIn: BehaviorSubject<boolean>;

  

  constructor(private httpClient: HttpClient) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isRegisteredSuccess = new BehaviorSubject<boolean>(false);
   }

  getHelloCORS(): void {
    console.log('Calling Hello CORS');
    // this.httpClient
    // .get('https://pspzvrwe5b.execute-api.ca-central-1.amazonaws.com/dev/')
    // .subscribe(data => {
    //   console.log(data);
    // });
    fetch(url).then(response => {
      return response.text();
    })
    .then(body => {
      console.log(body);
    })
    .catch(err => {
      console.error(err);
    });

    fetch('http://localhost:8080/user')
      .then(response => {
        return response.text();
      })
      .then(body => {
        console.log(body);
      })
      .catch(err => {
        console.error(err);
      });
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
              email: username,
              //phone_number: phoneNumber   // optional - E.164 number convention
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
        const userAttributes = await Auth.userAttributes(this.congitoUser);
        console.log(JSON.stringify(userAttributes));
        const verifiedEmailAttribute = userAttributes.find( attribute => {
          return attribute.getName() === 'email_verified';
        });
        console.log(JSON.stringify(verifiedEmailAttribute));
        if (verifiedEmailAttribute.getValue() === 'false') {
          console.log('We need to verify user email address before continue');
        }
      } catch (error) {
          console.log('error confirming sign up', error);
          this.setLoggedIn(false);
      }
    }
  }

  async verifyCurrentUserEmail(): Promise<any> {
    try {
      const returnValue = await Auth.verifyUserAttribute(this.congitoUser, 'email');
      console.log('verifyCurrentUserEmail', returnValue);
    } catch (error) {
      console.log('verifyCurrentUserEmail', error);
    }
  }

  async verifyCurrentUserEmailCode(code: string): Promise<any> {
    try {
      const returnValue = await Auth.verifyUserAttributeSubmit(this.congitoUser, 'email', code);
      console.log('verifyCurrentUserEmailCode', returnValue);
    } catch (error) {
      console.log('verifyCurrentUserEmailCode', error);
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<any> {
    try {
      const returnValue = await Auth.changePassword(this.congitoUser, oldPassword, newPassword);
      console.log('changePassword', returnValue);
    } catch (error) {
      console.log('changePassword', error);
    }
  }

  async forgotPasswordForEmail(email: string): Promise<any> {
    try {
      const returnValue = await Auth.forgotPassword(email);
      console.log('Success: ', returnValue);
    } catch (error) {
      console.log('error forgot password', error);
    }
  }

  async forgotPasswordSendCodeAndNewPassword(email: string, code: string, newPassword: string): Promise<any> {
    try {
      const returnValue = await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      console.log('error forgotPasswordSendCodeAndNewPassword', error);
    }
  }

  /**
   * revoking all the auth tokens (id token, access token and refresh token)
   * which means the user is signed out from all the devices.
   */
  async logOut(): Promise<any> {
    try {
        const returnValue = await Auth.signOut({ global: true });
        this.setLoggedIn(false);
        console.log('logOut:', returnValue);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}



