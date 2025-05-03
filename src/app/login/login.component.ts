import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Make sure this is correct
import { JwtResponse } from '../services/auth.service';

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
      next: (response: JwtResponse) => {  // Using JwtResponse from AuthService
        console.log('User logged in successfully', response);

        // Save the complete response (with token and user info)
        this.authService.saveToken(response.token);  // Save the access token
        this.authService.saveUser({
          token: response.token,  // Save token
          type: response.type,    // Save token type (Bearer)
          id: response.id,        // Save user ID
          username: response.username,  // Save username
          email: response.email,        // Save email
          roles: response.roles         // Save roles
        });

        // Navigate to home page after successful login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
