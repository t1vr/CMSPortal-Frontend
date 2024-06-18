import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessControlManagerComponent } from './access-control-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: "", component: AccessControlManagerComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [AccessControlManagerComponent]
})
export class AccessControlManagerModule { }
