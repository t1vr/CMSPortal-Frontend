import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessControlManagerComponent } from './access-control-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  { path: "", component: AccessControlManagerComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ToastModule
  ],
  declarations: [AccessControlManagerComponent]
})
export class AccessControlManagerModule { }
