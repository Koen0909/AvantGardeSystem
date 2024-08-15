import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
  

interface User {
  email: string;
  // Add other fields if needed
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticServiceService {

  constructor(
    private firestore: AngularFirestore
  ) {}

 async getUsersByDomain() {
    try {
      const usersSnapshot = await this.firestore.collection('users').get().toPromise();
      let sccpagUsers = 0;
      let otherUsers = 0;

      usersSnapshot?.forEach(doc => {
        const user = doc.data() as User;
        console.log(user);  // Log user data
        if (user.email && user.email.endsWith('@sccpag.edu.ph')) {
          sccpagUsers++;
        } else if (user.email) {
          otherUsers++;
        }
      });

      console.log(`sccpagUsers: ${sccpagUsers}, otherUsers: ${otherUsers}`);  // Log results
      return { sccpagUsers, otherUsers };
    } catch (error) {
      console.error("Error fetching user data: ", error);
      throw error;
    }
  }
}
