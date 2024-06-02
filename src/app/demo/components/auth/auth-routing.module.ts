import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
    { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'confirm-email', loadChildren: () => import('./confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule) },
    { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
