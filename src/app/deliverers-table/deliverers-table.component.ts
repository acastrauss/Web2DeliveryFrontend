import { AfterViewInit, Component, ViewChild,ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Deliverer } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { DeliverersTableDataSource, DeliverersTableItem } from './deliverers-table-datasource';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-deliverers-table',
  templateUrl: './deliverers-table.component.html',
  styleUrls: ['./deliverers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliverersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DeliverersTableItem>;
  dataSource: DeliverersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'username', 'name', 'email', 'dateOfBirth', 'address', 'status', 'btn_status'
  ];

  constructor(
    private _usersService : UsersService
  ) {

    this.dataSource = new DeliverersTableDataSource();

    this._usersService.GetAllDeliverers().subscribe((delivs) => {
      console.log(delivs);

      delivs.forEach((d : any) => {

        let item:DeliverersTableItem = new DeliverersTableItem();
        item.address = d.address;
        item.dateOfBirth = d.dateOfBirth;
        item.email = d.email;
        item.name = d.firstName + " " + d.lastName;
        item.username = d.username;
        item.id = d.id;
        switch(d.status){
          case 0: item.status = "APPROVED"; break;
          case 1: item.status = "DECLINED"; break;
          case 2: item.status = "ON HOLD"; break;
          default: item.status = "UNKNOWN"; break;
        }
        this.dataSource.data.push(item);
        // window.location.reload();

      })
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  OnChangeStatus(id:number, status:number){
    let adminId = jwt_decode(sessionStorage.getItem("token")!)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    // let adminId: number = JSON.parse(sessionStorage.getItem("user")!).id;
    this._usersService.ChangeDelivererStatus(id, status, adminId).subscribe((x:any) => {
      window.location.reload();
    },
      (error:any) => console.log(error)
    );
  }
}
