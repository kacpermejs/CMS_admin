import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginWithPassword, signInWithGoogle, signUpWithPassword } from '@core/store/actions/user.actions';

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

  store = inject(Store);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  handleAuth() {
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
        this.store.dispatch(signUpWithPassword({email, password}));
      } else {
        this.store.dispatch(loginWithPassword({email, password}));
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Authentication failed';
    } finally {
      this.isLoading = false;
    }
  }

  loginWithGoogle() {
    this.store.dispatch(signInWithGoogle());
  }

  toggleMode() {
    this.isFlipped = !this.isFlipped;
    this.errorMessage = null;
    this.loginForm.reset(); // Reset form on mode switch
  }
}
