import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user.model';

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

  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    this.ProfileForm.get("Username")?.setValue(user.username);
    this.ProfileForm.get("Email")?.setValue(user.email);
    this.ProfileForm.get("FirstName")?.setValue(user.firstName);
    this.ProfileForm.get("LastName")?.setValue(user.lastName);
    this.ProfileForm.get("Address")?.setValue(user.address);
    console.log(this.currentUser);
  }

  onSubmit() {
  }

}
