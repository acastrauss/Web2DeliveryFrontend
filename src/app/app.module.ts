import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    FormsContainerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
