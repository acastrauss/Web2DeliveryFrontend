import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import * as CryptoJS from 'crypto-js';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

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
    private router : Router,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {}

  onSubmit() {
    const plainPass: string = this.LoginForm.get("Password")?.value;
    let body = {...this.LoginForm.value};
    body["Password"] = CryptoJS.SHA256(plainPass).toString();

    this._formsService.Login(body).subscribe(
      (user: any) => { // 200 OK
        console.log(user);
        if(user.uType == 1){ // deliverer
          // check if approved
          this._userService.CheckDelivererApproved(user.id).subscribe((x) => {
            console.log(x);
            if(x){
              this.SuccesfullLogin(user);
            }
            else {
              alert("Your account is not approved.");
            }
          })
        }
        else {
          this.SuccesfullLogin(user);
        }
    },
    (error: any) => {
      this.LoginForm.reset();
      alert("Wrong credentialns");
    });
  }

  SuccesfullLogin(user:any){
    alert("Logged in");

    sessionStorage.setItem("token", user.token);
    sessionStorage.setItem("user", JSON.stringify(user));

    this.router.navigate(["/dashboard"]);
  }

}
