import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  { path: "", component: ResetPasswordComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    MessageModule,
    PasswordModule,
    ToastModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
