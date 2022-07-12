import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFormsGuard } from './login-forms.guard';
import { LoginGuard } from './login.guard';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: 'forms',
    component: FormsContainerComponent,
    canActivate: [LoginFormsGuard],
    canActivateChild: [LoginFormsGuard],
    canLoad: [LoginFormsGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
    canLoad: [LoginGuard]
  },
  {
    path: 'loginform',
    component: LoginFormComponent
  },
  {
    path: 'registerform',
    component: RegisterFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginGuard, LoginFormsGuard
  ]
})
export class AppRoutingModule { }
