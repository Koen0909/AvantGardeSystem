import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).then(() => {
        // Check if the user is admin
        if (email === 'admin@example.com') {
          alert('Login Successfully as Admin!');
          this.router.navigate(['/admin-upload']);
        } else {
          // Determine the appropriate home page based on email domain
          const emailDomain = email.split('@')[1];
          if (emailDomain === 'sccpag.edu.ph') {
            alert('Login Successfully as Seller!');
            this.router.navigate(['/view-items-seller']);
          } else {
            alert('Login Successfully as Buyer!');
            this.router.navigate(['/buyer-home']);
          }
        }
      }).catch(error => {
        console.error(error);
        alert('Login failed. Please check your credentials and try again.');
      });
    }
  }
  
  loginWithGoogle() { 
    return this.authService.loginWithGoogle().then((userCredential) => {
      // Check if userCredential and user exist and if the email has the desired domain
      if (userCredential?.user?.email) {
        // Navigate to the profile page based on the domain of the email
        if (userCredential.user.email.endsWith('@sccpag.edu.ph')) {
          this.router.navigate(['/seller-home']);// Artist-Seller
        } else {
          this.router.navigate(['/buyer-home']);// Customer-Buyer
        }
        return Promise.resolve(); // Return a resolved promise
      } else {
        // If userCredential or user doesn't exist, handle the error
        console.error('User or user email not found.');
        return Promise.reject('User or user email not found.');
      }
    }).catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
      return Promise.reject('Login failed');
    });
  }
  
  

  async signInWithGoogle() {
    try {
      await this.authService.linkGoogleAccount();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

}
