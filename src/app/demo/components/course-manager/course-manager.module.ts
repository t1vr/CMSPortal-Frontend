import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseManagerComponent } from './course-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { CourseUpsertComponent } from './course-upsert/course-upsert.component';
import { MessagesModule } from 'primeng/messages';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CardModule } from 'primeng/card';
import { CourseHistoryComponent } from './course-history/course-history.component';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { AttachCourseToCurriculumFormComponent } from './attach-course-to-curriculum-form/attach-course-to-curriculum-form.component';
import { CompareCourseComponent } from './compare-course/compare-course.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
  { path: "", component: CourseManagerComponent },
  { path: 'compare', component: CompareCourseComponent },
  { path: 'create/:curriculumId', component: CourseUpsertComponent },
  { path: 'edit/:courseId', component: CourseUpsertComponent },
  { path: 'history/:courseId', component: CourseHistoryComponent },
  { path: ':courseRevisionId', component: CourseDetailsComponent },

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
    FormsModule,
    InputNumberModule,
    RouterModule.forChild(routes),
    MessagesModule,
    CardModule,
    TimelineModule,
    FieldsetModule,
    DropdownModule,
    SplitButtonModule,
    DividerModule
  ],
  declarations: [CourseManagerComponent,
    CourseUpsertComponent,
    CourseDetailsComponent,
    CourseHistoryComponent,
    AttachCourseToCurriculumFormComponent,
    CompareCourseComponent]
})
export class CourseManagerModule { }
