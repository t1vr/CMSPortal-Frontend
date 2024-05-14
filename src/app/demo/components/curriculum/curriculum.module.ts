import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumComponent } from './curriculum.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { CurriculumListComponent } from './curriculum-list/curriculum-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { CourseUpsertComponent } from '../course-manager/course-upsert/course-upsert.component';
import { CalendarModule } from 'primeng/calendar';
import { CurriculumDetailsComponent } from './curriculum-details/curriculum-details.component';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';

const routes: Routes = [
  { path: "", component: CurriculumComponent },
  { path: ":curriculumId", component: CurriculumDetailsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    PanelModule,
    DynamicDialogModule,
    MultiSelectModule,
    RouterModule.forChild(routes),
    CalendarModule,
    TagModule,
    TableModule,
    DialogModule,
    DropdownModule,
    DataViewModule
  ],
  declarations: [CurriculumComponent,
    CurriculumFormComponent,
    CurriculumListComponent,
    CurriculumDetailsComponent]
})
export class CurriculumModule { }
