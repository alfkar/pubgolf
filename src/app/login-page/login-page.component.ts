import { Component } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true
})
export class LoginPageComponent {
  constructor(private userService: UserService) {}

  loginUserWithGithub() {
    this.userService.loginByGithub();
    
  }

  loginUserWithGoogle() {
    this.userService.loginByGoogle();
  }
}