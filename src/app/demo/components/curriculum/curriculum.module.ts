import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumComponent } from './curriculum.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { CurriculumListComponent } from './curriculum-list/curriculum-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { CourseUpsertComponent } from '../course-manager/course-upsert/course-upsert.component';

const routes: Routes = [
  { path: "", component: CurriculumComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    PanelModule,
    DynamicDialogModule,
    MultiSelectModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CurriculumComponent,
    CurriculumFormComponent,
    CurriculumListComponent]
})
export class CurriculumModule { }
