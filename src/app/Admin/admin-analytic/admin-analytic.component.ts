import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AnalyticServiceService } from '../../services/analytic-service.service';

@Component({
  selector: 'app-admin-analytic',
  templateUrl: './admin-analytic.component.html',
  styleUrl: './admin-analytic.component.css'
})
export class AdminAnalyticComponent implements OnInit{
  sccpagUsers = 0;
  otherUsers = 0;
  errorMessage: string | null = null;

  constructor(
    private analyticsService: AnalyticServiceService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.fetchAnalytics();
      } else {
        this.errorMessage = 'User is not authenticated';
      }
    });
  }

  async fetchAnalytics() {
    try {
      const { sccpagUsers, otherUsers } = await this.analyticsService.getUsersByDomain();
      this.sccpagUsers = sccpagUsers;
      this.otherUsers = otherUsers;
    } catch (error) {
      this.errorMessage = 'Failed to fetch user data. Please check your permissions.';
      console.error("Error fetching analytics: ", error);
    }
  }
}
