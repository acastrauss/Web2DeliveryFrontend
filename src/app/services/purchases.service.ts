import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { BaseURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private PurchasesAllURL: string = BaseURL + "Purchases"
  private ProductsAllURL: string = BaseURL + "Products"

  constructor(
    private http: HttpClient
  ) { }

  GetAllPurchases(){
    return this.http.get<any[]>(this.PurchasesAllURL);
  }

  GetAllProducts(){
    return this.http.get<any[]>(this.ProductsAllURL);
  }

  CreatePurchase(purhcase: any){
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post(
      this.PurchasesAllURL,
      purhcase,
      {
        headers : h
      }
    );
  }

  AcceptPurchase(purchaseId:number, delivererId: number){
    const body = {
      purchaseId: purchaseId,
      delivererId: delivererId
    };
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post(
      this.PurchasesAllURL + '/AcceptPurchase',
      body,
      {
        headers : h
      }
    );
  }

  FinishPurchase(purchaseId: number){
    const body = {
      purchaseId: purchaseId
    };
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post(
      this.PurchasesAllURL + '/FinishPurchase',
      body,
      {
        headers : h
      }
    );
  }
}
