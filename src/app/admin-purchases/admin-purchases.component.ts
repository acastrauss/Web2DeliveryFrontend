import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PurhaseStatus } from '../models/purchase.model';
import { PurchasesService } from '../services/purchases.service';
import { AdminPurchasesDataSource, AdminPurchasesItem } from './admin-purchases-datasource';

@Component({
  selector: 'app-admin-purchases',
  templateUrl: './admin-purchases.component.html',
  styleUrls: ['./admin-purchases.component.scss'],
})
export class AdminPurchasesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AdminPurchasesItem>;
  dataSource: AdminPurchasesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['totalPrice', 'comment', 'address', 'status', 'products'];

  constructor(
    private _purchasesService: PurchasesService
  ) {
    this.dataSource = new AdminPurchasesDataSource();

    this._purchasesService.GetAllPurchases().subscribe((purchases) => {
      console.log(purchases);

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
        item.products = [];
        p.purchaseItems.forEach((p:any) => item.products.push(p));
        this.dataSource.data.push(item);
      });
    });
  }

  ShowProds(){

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
