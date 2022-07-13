import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchaser-navigation',
  templateUrl: './purchaser-navigation.component.html',
  styleUrls: ['./purchaser-navigation.component.scss']
})
export class PurchaserNavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router : Router
  ) {}

  public logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.router.navigate(['/forms']);
  }

}
