import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyManagerComponent } from './faculty-manager.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumDetailsComponent } from '../curriculum/curriculum-details/curriculum-details.component';
import { CurriculumComponent } from '../curriculum/curriculum.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { FacultyUpsertComponent } from './faculty-upsert/faculty-upsert.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: FacultyManagerComponent },
  { path: ":curriculumId", component: CurriculumDetailsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataViewModule,
    ButtonModule,
    TagModule,
    DividerModule,
    TabMenuModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule
  ],
  declarations: [FacultyManagerComponent,
    FacultyListComponent,
    FacultyUpsertComponent
  ]
})
export class FacultyManagerModule { }
