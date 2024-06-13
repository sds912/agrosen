import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  isDeleted: boolean;
  phoneNumber: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: string;
  isVerified: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  role: string;
  enabled: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  loading: boolean = true;
  total: number = 0;
  pageSize = 10;
  pageIndex = 1;
  users: User[] = [];
  roles = ['FE', 'FS', 'NOC', 'ZM', 'ADMIN'];
  isVisible = false;
  isEditing = false;
  selectedUser: User | null = null;
  userForm: FormGroup;
  date = null;


  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      role: [''],
      username: [''],
      lastLogin: [''],
      createdAt: [''],
      updatedAt: [''],
      createdBy: [''],
      isDeleted: [''],
      isVerified: [''],
      isBlocked: [''],
      isLocked: [''],
      dateOfBirth: [''],
      placeOfBirth: [''],
      enabled: ['']
    });
  }

  showModal(user?: User): void {
    this.isEditing = !!user;
    this.selectedUser = user || null;
    if (user) {
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset();
    }
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    if (this.isEditing && this.selectedUser) {
      // Update user
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      this.users[index] = { ...this.selectedUser, ...this.userForm.value, updatedAt: new Date().toISOString() };
    } else {
      // Add new user
      const newUser: User = {
        ...this.userForm.value,
        id: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: null,
        isDeleted: false,
        lastLogin: '',
        isVerified: false,
        isBlocked: false,
        isLocked: false,
        dateOfBirth: null,
        placeOfBirth: null,
        enabled: true
      };
      this.users.push(newUser);
    }
    this.isVisible = false;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers()
    .subscribe(
      response => {
      this.users = response.data;
    this.loading = false;

    },
      error => {
        this.loading = false;

      })
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadUsers()
   // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }



}
