// Import necessary Angular modules and services
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login', // Define component selector
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './login.component.html', // Template URL
  styleUrl: './login.component.scss' // Style URL
})
export class LoginComponent {

  // Define form group for login
  loginFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]], // Email field with validators
    password: ['', Validators.required], // Password field with required validator
  })

  isLoading: boolean = false; // Loading state flag

  constructor(
    private router: Router, // Router service
    private service: AccountService, // Account service
    private fb: FormBuilder, // Form builder
    private snackBar: MatSnackBar // Snack bar service
  ) { }

  ngOnInit(): void {
    // Lifecycle hook (currently not used)
  }

  // Method to handle user login
  LoginUser() {
    if (this.loginFormGroup.valid) { // Check if form is valid
      this.isLoading = true; // Set loading state
      this.service.Login(this.loginFormGroup.value).subscribe(
        (result: any) => {
          this.setLogin(); // On success, call setLogin
        },
        (error: any) => {
          if (error.error.text === 'User is now logged in!') {
            this.setLogin(); // Handle specific error case
          } else {
            this.isLoading = false; // Reset loading state
            this.snackBar.open(error.error, 'error', { duration: 2000 }); // Show error message
          }
        }
      );
    }
  }

  // Method to handle post-login actions
  setLogin() {
    localStorage.setItem('User', 'isLoggedIn'); // Store login state in local storage
    this.loginFormGroup.reset(); // Reset the form
    this.isLoading = false; // Reset loading state
    this.snackBar.open('Logged In successfully', 'X', { duration: 5000 }); // Show success message
    this.router.navigateByUrl('products'); // Navigate to products page
    this.service.checkLogin(); // Check login status
  }
}
