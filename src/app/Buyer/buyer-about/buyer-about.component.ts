import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buyer-about',
  templateUrl: './buyer-about.component.html',
  styleUrl: './buyer-about.component.css'
})
export class BuyerAboutComponent {
  profile$: Observable<any> = new Observable<any>(); // Initialize with an empty observable

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private authService: AuthService,
    private db: AngularFireDatabase,

  ) {}

  ngOnInit(): void {
    this.profile$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return [];
        }
      })
    );
  }

  logout() {
    this.authService.logout();
    
  }
}
