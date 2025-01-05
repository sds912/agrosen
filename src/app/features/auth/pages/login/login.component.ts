import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { emailOrPhone, password } = this.loginForm.value;
      console.log('Login successful', emailOrPhone, password);
      // Perform login logic here
    }
  }

  onForgotPassword(): void {
    this.router.navigate(['/auth/reset-password'])
    console.log('Forgot Password Clicked');
    // Navigate to Forgot Password page or display modal
  }

  onLoginWithGoogle(): void {
    console.log('Login with Google');
    // Google login logic
  }

  onLoginWithFacebook(): void {
    console.log('Login with Facebook');
    // Facebook login logic
  }

  onRegister(): void {
    console.log('Navigate to Register Page');
    this.router.navigate(['/auth/signup'])
    // Navigate to registration page
  }
}
