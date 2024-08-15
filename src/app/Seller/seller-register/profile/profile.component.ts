import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/compat/app'; // Import firebase namespace
import 'firebase/compat/auth'; // Import firebase/auth for types
import 'firebase/compat/firestore'; // Import firebase/firestore for types

interface UserProfile {
  displayName: string;
  email: string;
  homeAddress?: string;
  age?: number;
  sex?: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile$: Observable<any>; // Initialize with an empty observable
  displayName: string | undefined;
  email: string | undefined;
  homeAddress: string | undefined;
  age: number | undefined;
  sex: string | undefined;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    this.profile$ = new Observable<any>();
  }

  ngOnInit(): void {
    this.profile$ = this.afAuth.authState;
    this.profile$.subscribe(profile => {
      if (profile) {
        this.displayName = profile.displayName;
        this.email = profile.email;
        this.firestore.collection('users').doc<UserProfile>(profile.uid).get().subscribe(userDoc => {
          if (userDoc.exists) {
            const userData = userDoc.data() as UserProfile;
            this.homeAddress = userData?.['homeAddress'];
            this.age = userData?.['age'];
            this.sex = userData?.['sex'];
          }
        });
      }
    });
  }

  saveProfile() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        user.updateProfile({
          displayName: this.displayName,
          photoURL: user.photoURL
        }).then(() => {
          // Update profile data in Firestore
          const userProfile: UserProfile = {
            displayName: this.displayName!,
            email: this.email!,
            homeAddress: this.homeAddress,
            age: this.age,
            sex: this.sex
          };

          this.firestore.collection('users').doc(user.uid).set(userProfile, { merge: true }).then(() => {
            console.log('Profile updated successfully');
          }).catch(error => {
            console.error('Error updating profile:', error);
          });
        }).catch((error: any) => {
          console.error('Error updating user profile:', error);
        });
      }
    });
  }
}
