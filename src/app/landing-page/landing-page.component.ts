import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router'; // Import for navigation


@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [LoginPageComponent]
})
export class LandingPageComponent {
  constructor(private router: Router){
  }
  ngOnInit() {
    this.router.navigate(['/home']);
  }
}
