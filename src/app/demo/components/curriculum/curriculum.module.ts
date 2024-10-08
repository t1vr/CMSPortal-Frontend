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
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { InplaceModule } from 'primeng/inplace';
import { CurriculumSettingsComponent } from './curriculum-settings/curriculum-settings.component';
import { InterdisciplinaryCoursesComponent } from './interdisciplinary-courses/interdisciplinary-courses.component';
import { CourseReviewRequestComponent } from './course-review-request/course-review-request.component';
import { EditorModule } from 'primeng/editor';
import { SharedModule } from '../../shared/shared.module';
import { PreviewCurriculumComponent } from './preview-curriculum/preview-curriculum.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CurriculumSummaryPublicComponent } from './curriculum-summary-public/curriculum-summary-public.component';
import { CurriculumCoursesPublicComponent } from './curriculum-courses-public/curriculum-courses-public.component';

const routes: Routes = [
  { path: "", component: CurriculumComponent },
  {
    path: ":curriculumId", component: CurriculumDetailsParentComponent,
    children: [
      { path: '', component: CurriculumSummaryComponent },
      { path: 'list', component: CurriculumDetailsComponent },
      { path: 'review-request', component: CourseReviewRequestComponent },
      { path: 'interdisciplinary-courses', component: InterdisciplinaryCoursesComponent },
      { path: 'preview', component: PreviewCurriculumComponent },
      { path: 'settings', component: CurriculumSettingsComponent }
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
    MenuModule,
    BadgeModule,
    InputTextModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
    CheckboxModule,
    DividerModule,
    SplitterModule,
    InplaceModule,
    InputGroupModule,
    EditorModule,
    SharedModule,
    TabMenuModule,

  ],
  declarations: [CurriculumComponent,
    CurriculumFormComponent,
    CurriculumListComponent,
    CurriculumDetailsComponent,
    CurriculumDetailsParentComponent,
    CurriculumSideMenuComponent,
    CurriculumSummaryComponent,
    CurriculumSettingsComponent,
    CourseReviewRequestComponent,
    InterdisciplinaryCoursesComponent,
    PreviewCurriculumComponent,
    CurriculumSummaryPublicComponent,
    CurriculumCoursesPublicComponent]
})
export class CurriculumModule { }
