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
import { CalendarModule } from 'primeng/calendar';
import { CurriculumDetailsComponent } from './curriculum-details/curriculum-details.component';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { CurriculumDetailsParentComponent } from './curriculum-details-parent/curriculum-details-parent.component';
import { CurriculumSideMenuComponent } from './curriculum-side-menu/curriculum-side-menu.component';
import { MenuModule } from 'primeng/menu';
import { CurriculumSummaryComponent } from './curriculum-summary/curriculum-summary.component';

const routes: Routes = [
  { path: "", component: CurriculumComponent },
  {
    path: ":curriculumId", component: CurriculumDetailsParentComponent,
    children: [
      { path: '', component: CurriculumSummaryComponent },
      { path: 'list', component: CurriculumDetailsComponent }
    ]
  },
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
    DataViewModule,
    MenuModule
  ],
  declarations: [CurriculumComponent,
    CurriculumFormComponent,
    CurriculumListComponent,
    CurriculumDetailsComponent,
    CurriculumDetailsParentComponent,
    CurriculumSideMenuComponent,
    CurriculumSummaryComponent]
})
export class CurriculumModule { }
