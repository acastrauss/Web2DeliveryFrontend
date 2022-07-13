import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deliverer } from '../models/user.model';
import { BaseURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private DeliverersURL: string = BaseURL + "Deliverers";
  private UsersURL: string = BaseURL + "Iusers";

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

  public GetById(id:number){
    let p = new HttpParams();
    p = p.append("id", id);
    return this.http.get(this.UsersURL, {
      params:p
    });
  }
}
