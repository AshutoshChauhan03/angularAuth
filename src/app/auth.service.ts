import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomSnackbarService } from './custom-snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject(false || localStorage.getItem('token'));

  constructor(private _http: HttpClient, private customSnackBar: CustomSnackbarService) { 
  }

  registerUser(user: {}) {
    let url = "http://localhost:3000/register";
    return this._http.post<any>(url, user);
  }

  loginUser(user: {}) {
    let url = "http://localhost:3000/login";
    return this._http.post<any>(url, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.customSnackBar.open("Logged Out !", 'Close')
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
