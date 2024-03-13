import { Component,Input } from '@angular/core';
import { User, UserService } from '../user.service';
 import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
 @Input() isLoggedIn: boolean = false;
 @Input() userName: String = '';
  constructor(private userService: UserService){}
  signOut() {
    this.userService.logout();
  }
}
