import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  
  users: any[] = [];
  isVisible = false;
  isOkLoading = false;
  currentUser: any = null;
  userForm!: FormGroup;
  roles: string[] = ['FE', 'FS'];


  constructor(private userService: UserService, private modal: NzModalService, private fb: FormBuilder, private message: NzMessageService) { 

    
  }

  ngOnInit(): void {
    this.loadUsers();
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  showModal(user?: any): void {
    if (user) {
      this.currentUser = { ...user };
    } else {
      this.currentUser = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        username: ''
      };
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(() => {
        this.loadUsers();
        this.message.success('User updated successfully');
        this.isVisible = false;
        this.isOkLoading = false;
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.message.success('User created successfully');
        this.isVisible = false;
        this.isOkLoading = false;
      },
    error => console.log(error));
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  deleteUser(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this user?',
      nzOnOk: () => {
        this.userService.deleteUser(id).subscribe(() => {
          this.loadUsers();
          this.message.success('User deleted successfully');
        });
      }
    });
  }


}
