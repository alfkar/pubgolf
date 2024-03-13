import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    // Subscribe to isLoggedIn changes
    this.isLoggedInSubscription = this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  canActivate(): boolean {
    if (this.isLoggedIn) {
      console.log('User is logged in');
      return true;
    } else {
      console.log('User is not logged in');
      this.router.navigate(['']);
      return false;
    }
  }

  ngOnDestroy() {
    // Unsubscribe from isLoggedIn observable to prevent memory leaks
    this.isLoggedInSubscription.unsubscribe();
  }
}
