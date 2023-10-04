import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  regForm!: FormGroup<any>;
  emailSent!: boolean;
  isValid!: boolean;

  constructor(private fb : FormBuilder, private user : ApiService, private dialog: MatDialog) {
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      phNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length of 8 characters
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/), // At least 1 capital, 1 special char, 1 number
        ]
      ]
    });
  }
  
  onSubmit() {
    if (this.regForm.valid) {
      let payload = {
        name: this.regForm.value.name,
        phNo: this.regForm.value.phNo,
        email: this.regForm.value.email,
        password: this.regForm.value.password
      };
      // this.user.register(payload).subscribe({
      //   next:(response) => {
      //     if(this.expected === response.headers.body) {
      //       this.emailSent = true;
      //     }
      //     else {
      //       this.emailSent = false;
      //     }
      //   }
      // });
      this.user.register(payload).subscribe(
        (response: any) => {
          // Handle the successful response here
          // Assuming your API returns a boolean in the response indicating success
          if (response && response.body) {
            this.emailSent = true; // Set emailSent to true if response indicates success
            // You can also process the response data if needed
            console.log('Success:', response);
          } else {
            this.emailSent = false; // Set emailSent to false if response indicates failure
            console.log('Response indicates failure:', response);
          }
        },
        (error) => {
          // Handle errors using the error function
          console.error('Error:', error);
          this.emailSent = false; // Set emailSent to false in case of an error
        }
      );
    }
    else {
      this.isValid = false;
    }
  } 
  closeRegisterDialog() {
    this.dialog.closeAll();
  }
}
