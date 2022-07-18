import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }

  GetUserType(){
    return jwt_decode(sessionStorage.getItem("token")!)['role'];
    // return JSON.parse(sessionStorage.getItem('user')!).uType;
  }

}
