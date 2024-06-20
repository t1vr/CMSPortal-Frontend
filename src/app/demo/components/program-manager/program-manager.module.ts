import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramManagerComponent } from './program-manager.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgramFormComponent } from '../program-form/program-form.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: "", component: ProgramManagerComponent }
];


@NgModule({
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DynamicDialogModule,
    SharedModule
  ],
  declarations: [ProgramFormComponent,
    ProgramManagerComponent]
})
export class ProgramManagerModule {
}
