import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { PurchasesService } from '../services/purchases.service';

@Component({
  selector: 'app-cd-timer',
  templateUrl: './cd-timer.component.html',
  styleUrls: ['./cd-timer.component.scss']
})
export class CdTimerComponent implements OnInit {
  private subscription!: Subscription;

  public dateNow = new Date();

  @Input()
  public purchaseId: number = 0;
  @Input()
  public purchaseStatus: string = "";

  private finished: boolean = false;

  @Input()
  public dDayStr: string = "";
  public dDay = new Date('Jan 01 2021 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference!:number;
  public secondsToDday!:number;
  public minutesToDday!:number;
  public hoursToDday!:number;
  public daysToDday!:number;

  constructor(
    private _purchaseService: PurchasesService
  ){
  }

  private getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference : any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));


    if(this.secondsToDday <= 0) this.secondsToDday = 0;
    if(this.minutesToDday <= 0) this.minutesToDday = 0;
    if(this.hoursToDday <= 0) this.hoursToDday = 0;
    if(this.daysToDday <= 0) this.daysToDday = 0;

    if(
      !this.finished && this.secondsToDday <= 0 && this.minutesToDday <= 0 &&
      this.hoursToDday <= 0 && this.daysToDday <= 0
      && this.purchaseStatus == 'ACCEPTED'){
      this.finished = true;
      this._purchaseService.FinishPurchase(this.purchaseId).subscribe((x) => {
        console.log(x);
      },
      (err) => {console.log(err);});
    }
  }

  ngOnInit() {
    this.dDay = new Date(this.dDayStr);
    console.log(this.dDayStr);
     this.subscription = interval(1000)
         .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
