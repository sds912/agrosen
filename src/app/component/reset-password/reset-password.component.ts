import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private message: NzMessageService,
    private loginService: LoginService,
   private router: Router) {
    this.resetForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { 'mismatch': true }
      : null;
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      // Handle reset password logic here
      this.loginService.resetPassword(this.resetForm.get('password')?.value)
      .subscribe((res) => {
      this.message.success('Password reset successfully!');
      this.router.navigate(['/admin/dashboard']);
        
      },
    error => {
      this.message.error('Error! retry later!');
     
       
    })
    }
  }
}
