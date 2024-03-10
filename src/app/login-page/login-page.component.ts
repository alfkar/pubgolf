import { Component, inject} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithPopup, GithubAuthProvider } from '@angular/fire/auth'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private auth: Auth = inject(Auth);
  byGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }
}