import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DeliverersTableComponent } from './deliverers-table/deliverers-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DelivererNavigationComponent } from './deliverer-navigation/deliverer-navigation.component';
import { PurchaserNavigationComponent } from './purchaser-navigation/purchaser-navigation.component';
import { DelivererViewComponent } from './deliverer-view/deliverer-view.component';
import { PurchaserViewComponent } from './purchaser-view/purchaser-view.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminPurchasesComponent } from './admin-purchases/admin-purchases.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    FormsContainerComponent,
    DashboardComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AdminViewComponent,
    AdminNavigationComponent,
    DeliverersTableComponent,
    DelivererNavigationComponent,
    PurchaserNavigationComponent,
    DelivererViewComponent,
    PurchaserViewComponent,
    ProductFormComponent,
    AdminPurchasesComponent,
    ProfileFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
