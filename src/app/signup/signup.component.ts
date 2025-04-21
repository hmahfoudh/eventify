import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: any = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { firstName, lastName, username, email, password, confirmPassword,} = this.form;
    
  console.log('Form data:', this.form);
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword ) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const signupData = { firstName, lastName, username, email, password  };

    this.authService.register(signupData).subscribe({
      next: (data) => {
        console.log('User registered:', data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed.';
        this.isSignUpFailed = true;
        alert(this.errorMessage);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
