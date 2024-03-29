import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from '../services/users.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-deliverer-view',
  templateUrl: './deliverer-view.component.html',
  styleUrls: ['./deliverer-view.component.scss']
})
export class DelivererViewComponent implements OnInit {

  private intervalLogout:any;

  constructor(
    private _usersService: UsersService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.intervalLogout = setInterval(() => {
      let userId = jwt_decode(sessionStorage.getItem("token")!)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
      // let userId = JSON.parse(sessionStorage.getItem('user')!).id;
      this._usersService.CheckDelivererApproved(userId).subscribe((x) => {
        if(!x){
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          this.router.navigate(['/forms']);
        }
      });
    }, 1000);
  }
}
