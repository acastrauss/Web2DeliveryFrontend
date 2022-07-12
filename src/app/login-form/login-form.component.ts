import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import * as CryptoJS from 'crypto-js';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  })

  constructor(
    private _formsService: FormsService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const plainPass: string = this.LoginForm.get("Password")?.value;
    let body = {...this.LoginForm.value};
    body["Password"] = CryptoJS.SHA256(plainPass).toString();

    this._formsService.Login(body).subscribe(
      (user: IUser) => { // 200 OK
        alert("Logged in");
        sessionStorage.setItem("token", "token");
        this.router.navigate(['/dashboard']);
    },
    (error: any) => {
      this.LoginForm.reset();
      alert("Wrong credentialns");
    });
  }

}
