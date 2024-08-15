import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@sccpag.edu.ph$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { displayName, email, password } = this.registerForm.value;
      this.authService.register(email, password)
        .then((result) => {
          if (result.user) {
            const profileData = {
              displayName: displayName,
              email: email,
              password: password, // For demonstration only; avoid storing plaintext passwords
              createdAt: new Date()
            };
            return this.authService.saveUserProfile(result.user.uid, profileData);
          } else {
            return Promise.reject(new Error('User is null after registration'));
          }
        })
        .then(() => {
          // Handle successful registration and profile creation
          alert("Successfully Registered!");
          this.registerForm.reset();
          // this.router.navigate(['/login']); //redirect to login page
        })
        .catch(error => {
          // Handle registration errors
          console.error(error);
          if (error && error.code === "auth/email-already-in-use") {
            this.registerForm.reset();
            alert("Email already exists. Or please choose a different one with the domain @sccpag.edu.ph!");
          } else {
            alert("An error occurred. Please try again.");
            this.registerForm.reset();
          }
        });
    }
  }
  
}
