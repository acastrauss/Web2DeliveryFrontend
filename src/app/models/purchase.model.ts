import { Product } from "./product.model";

export enum PurhaseStatus
{
  ORDERED = 0,
  ACCEPTED = 1,
  DELIVERED = 2,
  CANCELED = 3
}

export class Purchase {
  public PurchaseItems: Array<Product> = [];
  public DeliveryPrice: number = 250.0;
  public TotalPrice: number = this.DeliveryPrice;
  public Comment: string = "";
  public Address: string = "";
  public Id: number = -1;
  public Status: PurhaseStatus = PurhaseStatus.ORDERED;
}
