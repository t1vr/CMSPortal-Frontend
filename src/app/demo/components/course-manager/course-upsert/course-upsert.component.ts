import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CourseService } from 'src/app/demo/service/course.service';
import { BaseResponse, CourseForm, CourseItem, CreateCourseRequest, UpdateCourseRequest } from 'src/app/models/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-upsert',
  templateUrl: './course-upsert.component.html',
  styleUrls: ['./course-upsert.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CourseUpsertComponent implements OnInit {
  courseForm: FormGroup<CourseForm>;
  course: CourseItem;
  courseId: string;
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    if (this.courseId)
      this.getCourseById(this.courseId);

  }
  initForm() {
    this.courseForm = this.fb.group<CourseForm>({
      title: new FormControl("", Validators.required),
      creditHour: new FormControl(null, Validators.required),
      description: new FormControl("", Validators.required),
      courseCode: new FormControl(""),
    });
  }

  getCourseById(courseId: string) {
    this.courseService.getCourseById(courseId).subscribe(x => {
      if (x.data) {
        this.course = x.data;
        this.courseForm.patchValue(x.data)
      }
    })
  }

  submitForm(): void {
    if (!this.courseId)
      this.saveCourse();
    else
      this.updateCourse();
  }

  updateCourse() {
    this.courseService.updateCourseById(this.courseId, this.courseForm.value as UpdateCourseRequest)
      .subscribe((x: BaseResponse<CourseItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        }
      });
  }

  saveCourse() {
    this.courseService.createCourse(this.courseForm.value as CreateCourseRequest)
      .subscribe((x: BaseResponse<CourseItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }
      });
  }
}
