import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register', // Component selector
  standalone: true, // Indication of standalone component
  imports: [MaterialModule,CommonModule,FormsModule,ReactiveFormsModule], // Imported modules
  templateUrl: './register.component.html', // Template URL
  styleUrls: ['./register.component.scss'] // Style URLs
})
export class RegisterComponent implements OnInit {

  // Form group for registration
  registerFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]], // Email validation
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]], // Password validation
  })

  isLoading:boolean = false; // Loading indicator

  constructor(private router: Router, private service: AccountService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Function to register a user
  RegisterUser(){
    if(this.registerFormGroup.valid) // Check if form is valid
    {
        this.service.Register(this.registerFormGroup.value).subscribe((result:any) =>  
          {
            this.setRegister();  // Call function to handle successful registration
          },
          ((error:any) => {
              if (error.error === 'User Registered') { // If user is already registered
                this.setRegister(); // Call function to handle successful registration
              } 
              else 
              {
                this.isLoading = false; // Set loading indicator to false
                this.snackBar.open(error.error, 'error'); // Display error message
              }
          }));
    }
  }

  // Function to handle successful registration
  setRegister()
  {
    this.registerFormGroup.reset(); // Reset form fields
    this.snackBar.open(`Registered successfully`, 'X', {duration: 5000}); // Display success message
    this.router.navigateByUrl('login'); // Redirect to login page
  }

}
