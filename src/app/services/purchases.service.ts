import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { BaseURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private PurchasesAllURL: string = BaseURL + "Purchases"

  constructor(
    private http: HttpClient
  ) { }

  GetAllPurchases(){
    return this.http.get<any[]>(this.PurchasesAllURL);
  }
}
