import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deliverer } from '../models/user.model';
import { BaseURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private DeliverersURL: string = BaseURL + "Deliverers";

  constructor(
    private http: HttpClient
  ) { }


  public GetAllDeliverers(){
    return this.http.get<Deliverer[]>(this.DeliverersURL);
  }

  public ChangeDelivererStatus(id:number, status:number, adminId: number){
    return this.http.post(
      this.DeliverersURL + "/ChangeStatus",
      {
        id:id, status:status, adminId: adminId
      }
    )
  }
}
