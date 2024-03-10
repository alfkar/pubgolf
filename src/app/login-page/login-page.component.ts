import { Component, inject } from '@angular/core';
import { Auth, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Import for navigation

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private auth: Auth = inject(Auth);
  isLoggedIn = false; // Initial login state

  constructor(private router: Router) {
    // Check initial authentication state (optional)
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user; // Update login state based on user object
    });
  }

  async byGithub() {
    try {
      const credential = await signInWithPopup(this.auth, new GithubAuthProvider());
      const user = credential.user;
      this.isLoggedIn = true; // Update login state
      this.navigateToProtectedArea(); // Optional: Navigate to a protected area
    } catch (error) {
      console.error('Error signing in with Github:', error);
      // Handle errors appropriately, e.g., display error message to user
    }
  }

  async byGoogle() {
    try {
      const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const user = credential.user;
      this.isLoggedIn = true; // Update login state
      this.navigateToProtectedArea(); // Optional: Navigate to a protected area
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle errors appropriately
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.isLoggedIn = false; // Update login state
      this.router.navigate(['/login']); // Optional: Navigate to login page
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle errors appropriately
    }
  }

  private navigateToProtectedArea() {
    // Implement logic to navigate to a protected area of your application
    // based on your routing configuration (e.g., this.router.navigate(['/protected']))
  }
}
