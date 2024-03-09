import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GithubAuthProvider } from 'firebase/auth'; // Import the correct provider class
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private afAuth: AngularFireAuth) {}

  signInWithGitHub() {
    const provider = new GithubAuthProvider(); // Use the correct provider class
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        // Successful login
        console.log(result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }
}