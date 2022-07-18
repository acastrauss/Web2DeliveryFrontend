import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user.model';
import { FormsService } from '../services/forms.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  ProfileForm = new FormGroup({
    Username: new FormControl('', [
      Validators.required, Validators.minLength(4),
    ]),
    Email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
    ]),
    Password: new FormControl('', [
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    ]),
    FirstName: new FormControl('',[
      Validators.required, Validators.minLength(2),
    ]),
    LastName: new FormControl('',[
      Validators.required, Validators.minLength(2),
    ]),
    Address: new FormControl(''),
    Picture: new FormControl(''),
  })

  public currentUser!: IUser;

  private pictureFile!: File;

  constructor(
    private _formsService: FormsService,
    private router : Router,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    this.ProfileForm.get("Username")?.setValue(user.username);
    this.ProfileForm.get("Email")?.setValue(user.email);
    this.ProfileForm.get("FirstName")?.setValue(user.firstName);
    this.ProfileForm.get("LastName")?.setValue(user.lastName);
    this.ProfileForm.get("Address")?.setValue(user.address);
  }

  onSubmit() {
    let body = {...this.ProfileForm.value};
    if(body.Password != ''){
      const plainPass: string = this.ProfileForm.get("Password")?.value;
      body.Password = CryptoJS.SHA256(plainPass).toString();
    }

    let user = JSON.parse(sessionStorage.getItem("user")!);
    body.Id = user.id;

    if(!this.pictureFile){
      body.PicturePath = "";
      this._formsService.UpdateUser(body).subscribe((u : any) => {
        u.token = user.token;
        // u.uType = u.userType;
        sessionStorage.setItem("user", JSON.stringify(u));
        console.log(u);
        console.log(sessionStorage.getItem("user"));
        // window.location.reload();
        alert("saved");
        window.location.reload();
      }, (error:any) => {
        console.log('error on update');
      })
    }
    else {
      const formData = new FormData();
      formData.append("thumbnail", this.pictureFile);
      this._userService.SavePicture(formData).subscribe((p) => {
        body.PicturePath = p;
        this._formsService.UpdateUser(body).subscribe((u : any) => {
          u.token = user.token;
          // u.uType = u.userType;
          sessionStorage.setItem("user", JSON.stringify(u));
          console.log(u);
          console.log(sessionStorage.getItem("user"));
          // window.location.reload();
          alert("saved");
          window.location.reload();
        }, (error:any) => {
          console.log('error on update');
        })
      });
    }


  }

  onImageUploaded(event : any){
    this.pictureFile = event.target.files[0];
  }

}
