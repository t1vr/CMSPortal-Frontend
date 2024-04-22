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
import { CalendarModule } from 'primeng/calendar';
import { CurriculumDetailsComponent } from './curriculum-details/curriculum-details.component';

const routes: Routes = [
  { path: "", component: CurriculumComponent },
  { path: ":curriculumId", component: CurriculumDetailsComponent },
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
    CalendarModule,
  ],
  declarations: [CurriculumComponent,
    CurriculumFormComponent,
    CurriculumListComponent,
    CurriculumDetailsComponent]
})
export class CurriculumModule { }
