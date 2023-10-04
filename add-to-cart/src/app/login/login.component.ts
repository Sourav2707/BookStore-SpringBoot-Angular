import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HeaderComponent } from '../component/header/header.component';
import { ApiService } from '../service/api.service';
import { HttpResponse } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  title: any = '';
  isLoggedIn= false;
  isValid = false;
  userName! : string;
  constructor(private fb : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<HeaderComponent>, private dialog: MatDialog, private user : UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }  
  onSubmit() {
  if (this.loginForm.valid) {
    let payload = {
     email : this.loginForm.value.email,
     password : this.loginForm.value.password
    };
    this.api.login(payload).subscribe((response: HttpResponse<any>) =>
    {
      const token = response.headers.get('Authorization');
      if(token) {
        localStorage.setItem('token', token);
        this.dialogRef.close();
        this.api.loggedIn();
        this.setUsernameFromResponse(response.body);
      
      }
      else {
        this.isLoggedIn = true;
      }
    })
  }
  else {
    this.isValid = true;
  }
  console.log(this.isLoggedIn);
  console.log(this.api.isLoggedIn);
 }
 openLoginDialog(): void {
  const dialogRef = this.dialog.open(RegisterComponent, {
    width: '500px', height: '440px', // Adjust the width as needed
  });
}
closeLoginDialog() : void {
  this.dialog.closeAll();
}
setUsernameFromResponse(response : any) {
  const username = response.name;
  this.user.setUsername(username);
  console.log(username);
}
}
