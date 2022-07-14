import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { BaseURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private RegisterURL: string = BaseURL + "Iusers"
  private LoginURL: string = BaseURL + "Iusers/LoginUser"
  private CreateProductURL: string = BaseURL + "Products"

  constructor(
    private http: HttpClient
  ) { }

  Register(user: any){
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post<IUser>(
      this.RegisterURL,
      user,
      {
        headers : h
      }
    );
  }

  Login(user: any){
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post<IUser>(
      this.LoginURL,
      user,
      {
        headers : h
      }
    );
  }

  CreateProduct(product: any){
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.post<IUser>(
      this.CreateProductURL,
      product,
      {
        headers : h
      }
    );
  }

  UpdateUser(user: any){
    var h = new HttpHeaders();
    h.append("Content-Type", "application/json");

    return this.http.put(
      this.RegisterURL,
      user,
      {
        headers : h
      }
    );
  }
}
