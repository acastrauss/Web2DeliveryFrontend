import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  ProductForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Ingredients: new FormControl('', [Validators.required])
  })

  constructor(
    private _formsService: FormsService
  ) {
    let obj: object = jwt_decode(sessionStorage.getItem("token")!);
    console.log(obj);
    console.log(obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let body =
    {
      product : this.ProductForm.value,
      adminId : jwt_decode(sessionStorage.getItem("token")!)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']
    };


    this._formsService.CreateProduct(body)
    .subscribe((prod:any) => {
      console.log(prod);
      this.ProductForm.reset();
    },
    (err:any) => {
      console.log(err);
    });
  }
}
