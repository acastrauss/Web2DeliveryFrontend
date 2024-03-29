import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from '../models/product.model';
import { DELIVERY_PRICE, PurhaseStatus } from '../models/purchase.model';

export class TimeToDelivery{
  public days:number = 0;
  public hours:number = 0;
  public minutes:number = 0;
  public seconds:number = 0;
  public toString = () : string => {
    return `${this.days}:${this.hours}:${this.minutes}:${this.seconds}`;
  }
}

// TODO: Replace this with your own data model type
export class AdminPurchasesItem {
  public totalPrice: number = DELIVERY_PRICE;
  public comment: string = "";
  public address: string = "";
  public id: number = -1;
  public status: string = "";
  public products: Product[] = [];
  public timeToDelivery: TimeToDelivery|string = new TimeToDelivery();
  public deliveredAt: Date = new Date();
}

/**
 * Data source for the AdminPurchases view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminPurchasesDataSource extends DataSource<AdminPurchasesItem> {
  data: AdminPurchasesItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AdminPurchasesItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AdminPurchasesItem[]): AdminPurchasesItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AdminPurchasesItem[]): AdminPurchasesItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        // case 'name': return compare(a.name, b.name, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
