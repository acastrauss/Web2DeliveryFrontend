import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { LoginGuard, Permissions, UserToken } from './login.guard';

const routes: Routes = [
  {
    path: 'forms',
    component: FormsContainerComponent,
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
    canLoad: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginGuard, UserToken, Permissions
  ]
})
export class AppRoutingModule { }
