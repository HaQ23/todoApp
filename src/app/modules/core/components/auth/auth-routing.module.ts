import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authActivateGuard } from '../../guards/auth-activate.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authActivateGuard],
  },
  { path: 'zarejestruj', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
