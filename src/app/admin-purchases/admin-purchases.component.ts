import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PurhaseStatus } from '../models/purchase.model';
import { PurchasesCountService } from '../purchases-count.service';
import { PurchasesService } from '../services/purchases.service';
import { AdminPurchasesDataSource, AdminPurchasesItem, TimeToDelivery } from './admin-purchases-datasource';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-admin-purchases',
  templateUrl: './admin-purchases.component.html',
  styleUrls: ['./admin-purchases.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminPurchasesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AdminPurchasesItem>;
  dataSource: AdminPurchasesDataSource = new AdminPurchasesDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['totalPrice', 'comment', 'address', 'status', 'products', 'timeToDelivery', 'acceptPurchase'];

  private intervalUpdate:any;

  @Input()
  public tableType:number = 0;
  // 0 - all purchases
  // 1 - only for purchaser (previous)
  // 2 - current purchase deliverer/purchaser
  // 3 - waiting for accept for deliverer
  // 4 - previous for deliverer

  public myPurchases: any[] = [];

  constructor(
    private _purchasesService: PurchasesService,
    private _purchasesCountService: PurchasesCountService

  ) {
    this._purchasesCountService.PurchaseNum.subscribe((x) => {
      this.showOrderBtn = true;
    })
  }

  public showOrderBtn = true;

  ngOnInit(): void {

    if(this.tableType != 3){
      this.displayedColumns.splice(6, 1);
    }
    this.intervalUpdate = setInterval(() => {
      this._purchasesService.GetAllPurchases().subscribe(this.UpdatePurchases.bind(this));
    }, 1000);

    // if(this.tableType == 1){
    //   this._purchasesService.GetAllPurchases().subscribe(this.UpdatePurchases.bind(this));
    // }
    // else {

    // }
  }

  UpdateAll(purchases: any[]){
    this.dataSource.data = [];
    let newItems: AdminPurchasesItem[] = [];

    purchases.forEach(p => {
      let item:AdminPurchasesItem = new AdminPurchasesItem();
      item.address = p.address;
      item.comment = p.comment;
      item.id = p.id;
      item.status = "ORDERED";
      switch (p.status) {
        case PurhaseStatus.ORDERED:
          item.status = "ORDERED"
          break;
        case PurhaseStatus.ACCEPTED:
          item.status = "ACCEPTED"
          break;
        case PurhaseStatus.DELIVERED:
          item.status = "DELIVERED"
          break;
        case PurhaseStatus.CANCELED:
          item.status = "CANCELED"
          break;
        default:
          item.status = "UNKNOWN"
          break;
      }
      item.totalPrice = p.totalPrice;

      if(p.status == PurhaseStatus.ACCEPTED){

        let cDateMillisecs = new Date().getTime();
        let tDateMillisecs = new Date(p.deliveredAt).getTime();
        let difference = cDateMillisecs - tDateMillisecs;
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let newhours = hours - days*24;
        let newminutes = minutes - newhours*60;
        let newseconds = seconds - minutes*60;

        item.timeToDelivery = new TimeToDelivery();
        item.timeToDelivery.days = days;
        item.timeToDelivery.hours = newhours;
        item.timeToDelivery.minutes = newminutes;
        item.timeToDelivery.seconds = newseconds;
      }
      else if (p.status == PurhaseStatus.ORDERED){
        item.timeToDelivery = "WAITING FOR ACCEPT";
      }
      else {
        item.timeToDelivery = "NO TIME LEFT";
      }
      item.deliveredAt = new Date(p.deliveredAt);
      item.products = [];
      p.purchaseItems.forEach((p:any) => item.products.push(p));
      newItems.push(item);
    });

    this.dataSource.data = newItems;
    this.table.renderRows();
  }

  UpdateForUser(purchases: any[]){
    let newPurchs:any[] = [];
    let userId = jwt_decode(sessionStorage.getItem("token")!)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    // let userId = JSON.parse(sessionStorage.getItem('user')!).id;
    purchases.forEach(p => {
      if(this.tableType == 1){
        if(p.orderedBy == userId){
          newPurchs.push(p);
        }
      }
      else if (this.tableType == 4){
        if(p.deliveredBy == userId){
          newPurchs.push(p);

        }
      }
    });

    this.UpdateAll(newPurchs);
  }

  UpdateWaitingForDelivery(purchases: any[]){
    let newPurchs:any[] = [];
    purchases.forEach(p => {
      if(p.status == 0){ // ordered
        newPurchs.push(p);
      }
    });

    this.UpdateAll(newPurchs);
  }

  UpdatePurchases(purchases: any[]){
    purchases = purchases.reverse();
    this.myPurchases = purchases;

    switch (this.tableType) {
      case 0:
        this.UpdateAll(purchases);
        break;
      case 1:
      case 4:
        this.UpdateForUser(purchases);
        break;
      case 3:
        this.UpdateWaitingForDelivery(purchases);
        break;
      default:
        break;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  GetDate(row:any){
    return new Date(row.deliveredAt).toISOString();
  }

  OnAcceptPurchaser(row:any){

    let purchaseId = row.id;
    let userId = jwt_decode(sessionStorage.getItem("token")!)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    // let userId = JSON.parse(sessionStorage.getItem("user")!).id;
    this._purchasesService.AcceptPurchase(purchaseId, userId).subscribe((p) => {
      this.showOrderBtn = false;
    },
    (error:any) => console.log(error)
    );

  }

}
