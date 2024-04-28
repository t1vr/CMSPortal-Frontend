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
import { MessagesModule } from 'primeng/messages';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CardModule } from 'primeng/card';
import { CourseHistoryComponent } from './course-history/course-history.component';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { AttachCourseToCurriculumFormComponent } from './attach-course-to-curriculum-form/attach-course-to-curriculum-form.component';

const routes: Routes = [
  { path: "", component: CourseManagerComponent },
  { path: 'create/:curriculumId', component: CourseUpsertComponent },
  { path: ':courseRevisionId', component: CourseDetailsComponent },
  { path: 'edit/:courseId', component: CourseUpsertComponent },
  { path: 'history/:courseId', component: CourseHistoryComponent },
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
    MessagesModule,
    CardModule,
    TimelineModule,
    FieldsetModule,
    DropdownModule
  ],
  declarations: [CourseManagerComponent,
    CourseUpsertComponent,
    CourseDetailsComponent,
    CourseHistoryComponent,
    AttachCourseToCurriculumFormComponent]
})
export class CourseManagerModule { }
