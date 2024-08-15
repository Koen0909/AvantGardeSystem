import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buyer-register',
  templateUrl: './buyer-register.component.html',
  styleUrl: './buyer-register.component.css'
})
export class BuyerRegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
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
          alert("Successfully Registered!");
          this.registerForm.reset();
          // this.router.navigate(['/login']); //redirect to login page
        })
        .catch(error => {
          console.error(error);
          if (error && error.code === "auth/email-already-in-use") {
            this.registerForm.reset();
            alert("Email already exists. Please choose a different one.");
          } else {
            alert("An error occurred. Please try again.");
          }
        });
    }
  }

}
