import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddCourseToCurriculumRequest, CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { CourseItem, CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-attach-course-to-curriculum-form',
  templateUrl: './attach-course-to-curriculum-form.component.html',
  styleUrls: ['./attach-course-to-curriculum-form.component.css']
})
export class AttachCourseToCurriculumFormComponent implements OnInit {

  courseCurriculumSelectionForm: FormGroup;
  curriculums: CurriculumItem[] = [];
  selectedCourse: CourseItem;
  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    public dialogConfig: DynamicDialogConfig<{ curriculums: CurriculumItem[], selectedCourse: CourseItem }>) { }

  ngOnInit() {
    this.curriculums = this.dialogConfig.data.curriculums;
    this.selectedCourse = this.dialogConfig.data.selectedCourse;

    this.initForm();
  }

  onSubmitAddCurriculumForm() {
    this.courseService.addCourseToCurriculum(this.selectedCourse.courseId, this.courseCurriculumSelectionForm.value as AddCourseToCurriculumRequest).subscribe(x => {
      if (x.data) {
      }
    })
  }

  initForm() {
    this.courseCurriculumSelectionForm = this.fb.group({
      curriculumId: [this.selectedCourse.curriculumId, Validators.required]
    });
  }
}
