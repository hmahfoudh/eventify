import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Make sure this is correct
import { LocalStorageService } from '../services/local-storage.service';  // Import LocalStorageService
import { JwtResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private localStorageService: LocalStorageService // Inject LocalStorageService
  ) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response: JwtResponse) => {  // Using JwtResponse from AuthService
        console.log('User logged in successfully', response);

        // Save the complete response (with token and user info) in AuthService
        this.authService.saveToken(response.accessToken);  // Save the access token
        this.authService.saveUser({
          accessToken: response.accessToken,  // Save token
          tokenType: response.tokenType,    // Save token type (Bearer)
          id: response.id,        // Save user ID
          username: response.username,  // Save username
          email: response.email,        // Save email
          roles: response.roles         // Save roles
        });

        // ALSO save the user details and token in LocalStorageService
        this.localStorageService.saveToken(response.accessToken);
        this.localStorageService.saveUser({
          token: response.accessToken,      // ✅ fix here
          type: response.tokenType,         // ✅ fix here (use 'tokenType', not 'type')
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles
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
