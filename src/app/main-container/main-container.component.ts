import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  public userSigned:boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token") != null){
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/forms']);
    }
  }
}
