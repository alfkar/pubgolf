import { Component, inject } from '@angular/core';
import { Auth, signInWithPopup, signOut, onAuthStateChanged, UserInfo } from '@angular/fire/auth';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Import for navigation
import { Firestore, collection, setDoc, doc, getDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true
})
export class LoginPageComponent {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
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
      console.log(user)
      this.addUser(user);
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
      console.log(user)
      this.addUser(user);
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


  private async addUser(user: UserInfo): Promise<User> {
    const userRef = doc(collection(this.firestore, "users"), user.uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        console.warn('User already exists in Firestore:', user.uid);
        // User exists, return existing data with defaults for missing fields
        return {
          uid: user.uid,
          email: existingData['email'],
          name: existingData['name']
        };
      } else {
        // Document doesn't exist, proceed with setDoc
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName, // Add name from UserInfo
          // Add more user data as needed
        });
        console.log('User added to Firestore successfully');
        return { uid: user.uid, email: user.email || '', name: user.displayName || '' };
      }
    } catch (error) {
      console.error('Firestore Error:', error);
      // Handle errors (consider throwing or returning a specific error object)
      return Promise.reject(error); // Return a rejected promise with the error
    }
  }  
private navigateToProtectedArea() {
    // Implement logic to navigate to a protected area of your application
    // based on your routing configuration (e.g., this.router.navigate(['/protected']))
  }
}
export interface User{
  uid: String,
  name: String,
  email: String
}
