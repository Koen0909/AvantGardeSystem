import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;

  getUser(): Observable<any> {
    return this.afAuth.user; // This returns an observable of the current user
  }
  
  getUserEmail(): Observable<string | null> {
    return this.afAuth.user.pipe(
      map(user => user?.email ?? null));
  }

  getCurrentUser() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private db: AngularFireDatabase, // Inject AngularFireDatabase service  
    private router: Router,
  ) { }

  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        if (credential.user) {
          const profileData = {
            email: email,
            createdAt: new Date()
          };
          return this.saveUserProfile(credential.user.uid, profileData)
            .then(() => ({ user: credential.user }));  // Ensuring we return something here
        } else {
          // Handle the case where user is null
          throw new Error("User creation failed");
        }
      });
  }
  
  

  saveUserProfile(userId: string, profileData: any) {
    return this.firestore.collection('users').doc(userId).set(profileData);
  }

  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful
      })
      .catch(error => {
        console.error('Login error:', error.code, error.message);
        // Handle different error codes appropriately
        if (error.code === 'auth/user-not-found') {
          // User not found
        } else if (error.code === 'auth/wrong-password') {
          // Incorrect password
        } else {
          // Other error
        }
        throw error; // Rethrow the error to handle it elsewhere if needed
      });
  }
  

  async loginWithGoogle() {
    const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = result.user;
    if (user) { 
      // Link Google account with existing email/password account
      await this.linkGoogleAccountIfNeeded(user);
      // Save or update user data in Firestore
      await this.updateUserData(user);
    }
    return result;
  }

   private async linkGoogleAccountIfNeeded(user: firebase.User) {
    const userEmailRef = this.firestore.collection('users', ref => ref.where('email', '==', user.email)).get();
    const userEmailDoc = await userEmailRef.toPromise();

    if (userEmailDoc && !userEmailDoc.empty) {
      const existingUserDoc = userEmailDoc.docs[0];
      if (existingUserDoc.exists) {
        // User exists with email/password, link Google account
        const existingUser = existingUserDoc.data() as { uid: string, password: string };  // Explicitly define the type
        if (existingUser && existingUser.uid !== user.uid) {
          // Linking existing account with Google account
          const credential = firebase.auth.EmailAuthProvider.credential(user.email!, existingUser.password);
          await user.linkWithCredential(credential);
        }
      }
    }
  }

  private async updateUserData(user: firebase.User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const userEmailRef = this.firestore.collection('users', ref => ref.where('email', '==', user.email)).get();
    
    const userEmailDoc = await userEmailRef.toPromise();
    
    if (userEmailDoc && !userEmailDoc.empty) {
      // Email already exists, update existing user document
      const existingUserDoc = userEmailDoc.docs[0];
      userRef.set({
        uid: existingUserDoc.id,
        email: user.email,  
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } else {
      // New user, set user data
      userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  }
  

  private async saveUserData(user: firebase.User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const userEmailRef = this.firestore.collection('users', ref => ref.where('email', '==', user.email)).get();
  
    const userEmailDoc = await userEmailRef.toPromise();
    
    if (userEmailDoc && !userEmailDoc.empty) {
      // Email already exists, update existing user document
      const existingUserDoc = userEmailDoc.docs[0];
      await userRef.set({
        uid: existingUserDoc.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } else {
      // New user, set user data
      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  }
  

  linkGoogleAccount() {
    this.afAuth.currentUser
      .then(user => {
        if (user) {
          const googleProvider = new firebase.auth.GoogleAuthProvider();
          user.linkWithPopup(googleProvider)
            .then(() => {
              console.log('Google account linked');
            })
            .catch(error => {
              console.error('Error linking Google account:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error getting current user:', error);
      });
  }
  
  
  logout() {
    return this.afAuth.signOut().then(() => {
      // Redirect to the login page after logout
      this.router.navigate(['/login']);
    });
  }

  async updatePassword(newPassword: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.updatePassword(newPassword);
    } else {
      throw new Error('User not authenticated');
    }
  }
  

}
