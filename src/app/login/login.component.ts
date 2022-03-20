import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomSnackbarService } from '../custom-snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder , private _auth: AuthService, private router: Router, private customSnackBar: CustomSnackbarService) { 
    let doesTokenExists = localStorage.getItem('token');
    if(doesTokenExists) {
      
      this.router.navigate(['/events'])
      this._auth.isLoggedIn.next(true);
    }

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  myForm!: FormGroup;

  ngOnInit(): void {
    
  }

  submit() {
    if(this.myForm.valid) {
      this._auth.loginUser(this.myForm.value).subscribe(
        token => {
          this.router.navigate(['/events'])
          localStorage.setItem("token", token.token);
          this._auth.isLoggedIn.next(true);
          this.customSnackBar.open("Logged In !", 'Close')
        },
        err => {
          this.customSnackBar.open(err.error.error, 'Sorry !')
        }
      )      
    }
  }

}
