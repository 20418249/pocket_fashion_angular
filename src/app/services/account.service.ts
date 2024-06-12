import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'http://localhost:5240/api'; // API base URL
  isLoggedIn = false; // Flag to indicate user login status

  // Function to register a user
  Register(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}/Auth/Register`, user); // HTTP POST request to register user
  }

  // Function to log in a user
  Login(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}/Auth/Login`, user); // HTTP POST request to log in user
  }

  // Function to check if user is logged in
  checkLogin() {
    if (localStorage.getItem('User')) { // Check if user data exists in local storage
      this.isLoggedIn = true; // Set isLoggedIn flag to true
    } else {
      this.isLoggedIn = false; // Set isLoggedIn flag to false
    }
    return this.isLoggedIn; // Return isLoggedIn flag
  }
}
