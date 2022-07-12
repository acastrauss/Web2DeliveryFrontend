import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss']
})
export class FormsContainerComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  RouteLogin(){
    this.router.navigate(['/loginform']);
  }

  RouteRegister(){
    this.router.navigate(['/registerform']);
  }

}
