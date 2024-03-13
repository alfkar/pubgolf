import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router'; // Import for navigation
import { Firestore, collection, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // BehaviorSubject for isLoggedIn
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable(); // Observable for isLoggedIn

  private loggedInUserSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined); // BehaviorSubject for loggedInUser
  loggedInUser$: Observable<User | undefined> = this.loggedInUserSubject.asObservable(); // Observable for loggedInUser

  constructor(private router: Router) {
    // Check initial authentication state (optional)
    onAuthStateChanged(this.auth, (user) => {
      const isLoggedIn = !!user;
      this.isLoggedInSubject.next(isLoggedIn); // Update isLoggedIn observable
      if (isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true'); // Store in local storage
        // If user is logged in, try to fetch and store user data
        this.getUserData(user?.uid);
      } else {
        localStorage.removeItem('isLoggedIn'); // Clear from local storage
        localStorage.removeItem('loggedInUser'); // Clear user data from local storage
      }
    });

    // Retrieve authentication state from local storage
    const storedLoggedInState = localStorage.getItem('isLoggedIn');
    const isLoggedInFromStorage = storedLoggedInState === 'true';
    this.isLoggedInSubject.next(isLoggedInFromStorage);

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('loggedInUser');
    const loggedInUserFromStorage: User | undefined = storedUserData ? JSON.parse(storedUserData) : undefined;
    this.loggedInUserSubject.next(loggedInUserFromStorage);
  }

  async loginByGithub() {
    try {
      const credential = await signInWithPopup(this.auth, new GithubAuthProvider());
      const user = credential.user;
      console.log(user);
      await this.addUser(user);
      this.loggedInUserSubject.next(await this.addUser(user)); // Update loggedInUser observable
      this.isLoggedInSubject.next(true); // Update isLoggedIn observable
      localStorage.setItem('isLoggedIn', 'true'); // Store in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user data in local storage
      this.navigateToProtectedArea(); // Optional: Navigate to a protected area
    } catch (error) {
      console.error('Error signing in with Github:', error);
      // Handle errors appropriately, e.g., display error message to user
    }
  }

  async loginByGoogle() {
    try {
      const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const user = credential.user;
      console.log(user);
      this.loggedInUserSubject.next(await this.addUser(user)); // Update loggedInUser observable
      this.isLoggedInSubject.next(true); // Update isLoggedIn observable
      localStorage.setItem('isLoggedIn', 'true'); // Store in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user data in local storage
      this.navigateToProtectedArea(); // Optional: Navigate to a protected area
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle errors appropriately
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.isLoggedInSubject.next(false); // Update isLoggedIn observable
      localStorage.removeItem('isLoggedIn'); // Clear from local storage
      localStorage.removeItem('loggedInUser'); // Clear user data from local storage
      this.router.navigate(['']); // Optional: Navigate to login page
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle errors appropriately
    }
  }

  private async addUser(user: any): Promise<User> {
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

  private async getUserData(uid: string | undefined): Promise<void> {
    if (!uid) return;

    const userRef = doc(collection(this.firestore, "users"), uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const loggedInUser: User = {
          uid: uid,
          email: userData['email'],
          name: userData['name']
        };
        this.loggedInUserSubject.next(loggedInUser); // Update loggedInUser observable
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); // Store user data in local storage
      }
    } catch (error) {
      console.error('Firestore Error:', error);
    }
  }

  private navigateToProtectedArea() {
    console.log("Navigating to protected area");
    this.router.navigate(['home']);
  }
}

export interface User {
  uid: String,
  name: String,
  email: String
}
