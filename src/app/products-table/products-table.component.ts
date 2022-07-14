import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../models/product.model';
import { DELIVERY_TIME, Purchase, PurhaseStatus } from '../models/purchase.model';
import { PurchasesService } from '../services/purchases.service';
import { ProductsTableDataSource, ProductsTableItem } from './products-table-datasource';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductsTableItem>;
  dataSource: ProductsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'price', 'ingredients', 'quantity'];

  public comment:string="";

  constructor(
    private _purchaseService: PurchasesService
  ) {
    this.dataSource = new ProductsTableDataSource();

    _purchaseService.GetAllProducts().subscribe((prods: any[]) => {
      prods.forEach(p => {
        let pti = new ProductsTableItem();
        pti.id = p.id;
        pti.ingredients = p.ingredients;
        pti.name = p.name;
        pti.price = p.price;
        pti.quantity = 0;
        this.dataSource.data.push(pti);
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  OnOrder(){
    let purch = new Purchase();
    purch.Comment = this.comment;
    purch.Address = JSON.parse(sessionStorage.getItem("user")!).address;
    purch.Status = PurhaseStatus.ORDERED;
    purch.TotalPrice = purch.DeliveryPrice;
    let tempDate = new Date();
    tempDate.setSeconds(purch.CreatedAt.getSeconds() + DELIVERY_TIME);
    purch.DeliveredAt = tempDate;

    this.dataSource.data.forEach(d => {
      for (let i = 0; i < d.quantity; i++) {
        let p = new Product();
        p.Id = d.id;
        p.Ingredients = d.ingredients;
        p.Name = d.name;
        p.Price = d.price;
        purch.TotalPrice += p.Price;
        purch.PurchaseItems.push(p);
      }
    })

    const body = {
      purchase: purch,
      deliveredTo : JSON.parse(sessionStorage.getItem("user")!).id,
      deliveredBy: null
    }

    this._purchaseService.CreatePurchase(body).subscribe((purch:any)=> console.log(purch));
  }
}
