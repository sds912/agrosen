import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { phoneNumberValidator } from '../../shared/validators/phoneNumberValidator';

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
  lastName: any;
  firstName: any;
  username: any;
  selectedRole: any;
  filteredRole: any;
  filterParams = {
    username: null,
    role: null,
    fn: null,
    ln: null
  }



  onChange(result: Date): void {
   // console.log('onChange: ', result);
  }
  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {
    this.userForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required,  phoneNumberValidator]],
      role: ['',[Validators.required]],
      username: ['',[Validators.required]],
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
    this.selectedUser = user ?? null;

    
    
    if (this.selectedUser !== null && this.selectedUser !== undefined) {
      this.userForm?.disable();
    this.userForm?.get('role')?.enable();
      this.userForm.patchValue(this.selectedUser);
    } else {
      this.userForm?.enable();
      this.userForm.reset();
    }
    this.isVisible = true;
  }

  handleCancel(): void {
    this.selectedUser = null;
    this.isVisible = false;
    console.log(this.selectedUser);
    
  }

  handleOk(): void {
    if(this.userForm?.valid){
      if (this.isEditing && this.selectedUser) {
     
        // Update user
        const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
        this.users[index] = { ...this.selectedUser, ...this.userForm.value, updatedAt: new Date().toISOString() };
        
        
        this.userService.updateUser(this.selectedUser.id, this.selectedUser)
        .subscribe(
          response => {
            this.message.success('Updated Successfully !');
            this.loadUsers();
          },
          error => {
             this.message.error(error?.error?.messages??[0]??'Unknown Error !')
             
          }
        )
      } else {
        // Add new user
        const newUser: User = {
          ...this.userForm.value,
          id: '',
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
        //console.log(newUser);
        
        this.userService.createUser(newUser)
        .subscribe(
          response => {
            this.message.success('Created Successfully !');
            this.loadUsers();
          },
          error => {
           // console.log(error.error);
            
             this.message.error(error.error?.message??'Unknown Error !')
             
          }
        )
      }
      this.isVisible = false;
    } else{
      console.log(this.userForm.controls['phoneNumber']);
      
      this.message.warning('Form invalid')
    }
    
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
   // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadUsers()
   // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }


    applayFilter() {
      this.loading = true;
      this.userService.filterByParams(this.filterParams)
      .subscribe(
        (res: any) => {
          //console.log(res);
          
          this.users = res?.data;
           this.loading = false;

        },
        error => {
          this.message.error('Loading data failed');
          this.loading = false;

        }
      )
    }
    reloadData() {
       this.resetFilter();
       this.loadUsers();
    }
    onLastNameSearch(target: any) {
     this.filterParams.ln = target.value;
     
    }
    onUsernameSearch(target: any) {
     this.filterParams.username = target.value;
      
    }
    onFirstNameSearch(target: any) {
     this.filterParams.fn = target.value;
    }
    onRoleSearch(value: any) {
     this.filterParams.role = value;
      this.loading = true;
      this.userService.getUsersByRole(value)
      .subscribe((res: any)=> {
        console.log(res);
        
        this.users = res?.data;
        this.loading = false;
      },
    error =>{ 
      this.message.error('Loading data failed !');
      this.loading = false;
    })
      }

    resetFilter (){
      this.username = null;
      this.lastName = null;
      this.firstName = null;
      this.filteredRole = null;
      this.filterParams.fn = null;
      this.filterParams.ln = null;
      this.filterParams.role = null;
      this.filterParams.username = null;
    }
}
