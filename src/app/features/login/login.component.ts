import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isFlipped = false; // Controls the flip animation
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  async handleAuth() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;
    const { email, password, confirmPassword } = this.loginForm.value;

    try {
      if (this.isFlipped) {
        if (password !== confirmPassword) {
          this.errorMessage = 'Passwords do not match!';
          return;
        }
        await this.authService.registerWithEmailAndPassword(email, password);
        console.log('Registration successful!');
      } else {
        await this.authService.signInWithEmailAndPassword(email, password);
        console.log('Login successful!');
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Authentication failed';
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      console.log('Google Sign-in successful!');
    } catch (error: any) {
      this.errorMessage = error.message || 'Google Sign-in failed';
    }
  }

  toggleMode() {
    this.isFlipped = !this.isFlipped;
    this.errorMessage = null;
    this.loginForm.reset(); // Reset form on mode switch
  }
}
