import { Byte } from "@angular/compiler/src/util";
import { Product } from "./product.model";
import { Purchase } from "./purchase.model";

export enum UserType {
    ADMIN = 0,
    DELIVERER = 1,
    CONSUMER = 2
}

export interface IUser {
  Id:number;
  Username: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: Date;
  Address: string;
  Picture: Byte[];
  UType: UserType;
}

export enum ApprovalStatus
{
  APPROVED = 0,
  CANCELED = 1,
  ON_HOLD = 2
}

export class Deliverer implements IUser {
  public Id:number = -1;
  public Username: string = "";
  public Email: string = "";
  public Password: string = "";
  public FirstName: string = "";
  public LastName: string = "";
  public DateOfBirth: Date = new Date();
  public Address: string = "";
  public Picture: Array<Byte> = [];
  public readonly UType: UserType = UserType.DELIVERER;

  public Purchases: Array<Purchase> = [];
  public CurrentDelivery: Purchase = new Purchase();
  public Status: ApprovalStatus = ApprovalStatus.ON_HOLD;
}

export class Purchaser implements IUser{
  public Id:number = -1;
  public Username: string = "";
  public Email: string = "";
  public Password: string = "";
  public FirstName: string = "";
  public LastName: string = "";
  public DateOfBirth: Date = new Date();
  public Address: string = "";
  public Picture: Array<Byte> = [];
  public readonly UType: UserType = UserType.CONSUMER;

  public CurrentDelivery: Purchase = new Purchase();
  public PreviousPurchases: Array<Purchase> = [];
}

export class Admin implements IUser{
  public Id:number = -1;
  public Username: string = "";
  public Email: string = "";
  public Password: string = "";
  public FirstName: string = "";
  public LastName: string = "";
  public DateOfBirth: Date = new Date();
  public Address: string = "";
  public Picture: Array<Byte> = [];
  public readonly UType: UserType = UserType.ADMIN;

  public Deliverers: Array<Deliverer> = [];
  public Products: Array<Product> = [];
}
