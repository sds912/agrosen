import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const { email } = this.forgetPasswordForm.value;
      console.log('Password reset email sent to:', email);
    }
  }

  goBackToLogin(): void {
    this.router.navigate(['/auth/signin'])
    console.log('Navigate to login page');
  }
}
