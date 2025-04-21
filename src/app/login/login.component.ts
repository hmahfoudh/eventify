import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.authService.login(loginData).subscribe({
      next: (user) => {
        console.log('User logged in successfully', user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
  
}
