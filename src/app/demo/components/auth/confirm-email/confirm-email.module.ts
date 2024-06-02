import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  { path: "", component: ConfirmEmailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ToastModule
  ],
  declarations: [ConfirmEmailComponent]
})
export class ConfirmEmailModule {
}
