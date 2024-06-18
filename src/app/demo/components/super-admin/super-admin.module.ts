import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TenantUpsertComponent } from './tenant-upsert/tenant-upsert.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes: Routes = [
  {
    path: "", component: SuperAdminComponent,
    children: [
      { path: "", component: SuperAdminDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabMenuModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    DynamicDialogModule,
    ToastModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  declarations: [SuperAdminComponent,
    SuperAdminDashboardComponent,
    TenantUpsertComponent
  ]
})
export class SuperAdminModule { }
