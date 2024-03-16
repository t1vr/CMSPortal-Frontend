import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseManagerComponent } from './course-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { CourseUpsertComponent } from './course-upsert/course-upsert.component';

const routes: Routes = [
  { path: "", component: CourseManagerComponent },
  { path: 'create', component: CourseUpsertComponent },
  { path: 'edit/:courseId', component: CourseUpsertComponent },

];

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    ToolbarModule,
    TableModule,
    EditorModule,
    ReactiveFormsModule,
    InputNumberModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CourseManagerComponent,
    CourseUpsertComponent]
})
export class CourseManagerModule { }
