import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pubgolf';
  constructor(private router: Router) { }
  onSignInClick() {
    this.router.navigate(['']); // Navigate to sign-in page
  }
}
