import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import * as CryptoJS from 'crypto-js';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  RegisterForm = new FormGroup({
    Username: new FormControl('', [
      Validators.required, Validators.minLength(4),
    ]),
    Email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
    ]),
    Password: new FormControl('', [
      Validators.required, Validators.minLength(8),
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    ]),
    PasswordConfirm: new FormControl('', [
      Validators.required, Validators.minLength(8),
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),
    ]),
    FirstName: new FormControl('',[
      Validators.required, Validators.minLength(2),
    ]),
    LastName: new FormControl('',[
      Validators.required, Validators.minLength(2),
    ]),
    DateOfBirth: new FormControl('',
    [
      Validators.required, Validators.minLength(4),
    ]),
    Address: new FormControl(''),
    Picture: new FormControl(''),
    UType: new FormControl('')
  })

  private pictureFile!: File;

  constructor(
    private _formsService: FormsService,
    private router : Router,
    private _userService: UsersService

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const plainPass: string = this.RegisterForm.get("Password")?.value;
    let body = {...this.RegisterForm.value};
    body["Password"] = CryptoJS.SHA256(plainPass).toString();

    if(!this.pictureFile) return;
    const formData = new FormData();
    formData.append("thumbnail", this.pictureFile);
    this._userService.SavePicture(formData).subscribe((path) => {
      body.PicturePath = path;
      console.log(body);

      this._formsService.Register(body).subscribe(
        (user: any) => {
          this.RegisterForm.reset();
          alert("Registered");
          this.router.navigate(['/loginform']);
      },
      (error: any) => {
        alert("error");
      }
      );
    },
    (error) => {
      console.log(error);
    })


  }

  SamePasswords():boolean{
    return this.RegisterForm.get("Password") == this.RegisterForm.get("PasswordConfirm");
  }

  onImageUploaded(event:any){
    this.pictureFile = event.target.files[0];
  }
}
