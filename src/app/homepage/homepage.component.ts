import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isLoggedIn: boolean = false;
  loggedInUser: User | undefined;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    // Subscribe to isLoggedIn changes
    this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      console.log('isLoggedIn', isLoggedIn);
    });
    // Subscribe to loggedInUser changes
    this.userService.loggedInUser$.subscribe((loggedInUser: User | undefined) => { // Update the parameter type
      this.loggedInUser = loggedInUser;
      console.log('user', loggedInUser);

    });
  }
  signOut() {
    this.userService.logout();
  }
}
