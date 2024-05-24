import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyManagerComponent } from './faculty-manager.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumDetailsComponent } from '../curriculum/curriculum-details/curriculum-details.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { FacultyUpsertComponent } from './faculty-upsert/faculty-upsert.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FacultyDetailsComponent } from './faculty-details/faculty-details.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

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
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    MultiSelectModule
  ],
  declarations: [FacultyManagerComponent,
    FacultyListComponent,
    FacultyUpsertComponent,
    FacultyDetailsComponent
  ]
})
export class FacultyManagerModule { }
