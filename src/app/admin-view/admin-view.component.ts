import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Deliverers', cols: 1, rows: 1 },
  //         { title: 'Purchases', cols: 1, rows: 1 },
  //         { title: 'Add product', cols: 1, rows: 1 },
  //       ];
  //     }

  //     return [
  //       { title: 'Deliverers', cols: 2, rows: 2 },
  //       { title: 'Purchases', cols: 2, rows: 2 },
  //       { title: 'Add product', cols: 2, rows: 2 },
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver) {}


}
