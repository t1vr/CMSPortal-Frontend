import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from '../../api/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseResponse, CourseForm, CourseItem, CreateCourseRequest, CurriculumItem } from 'src/app/models/tenant.model';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculumService } from '../../service/curriculum.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttachCourseToCurriculumFormComponent } from './attach-course-to-curriculum-form/attach-course-to-curriculum-form.component';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class CourseManagerComponent implements OnInit {

  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  courseForm: FormGroup<CourseForm>;
  courseCurriculumSelectionForm: FormGroup;

  selectedCourse: CourseForm;
  courses: CourseItem[] = [];
  curriculums: CurriculumItem[] = [];
  isCourseCurriculumSelectionFormVisible: boolean;
  ref: DynamicDialogRef | undefined;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService,
    private courseService: CourseService,
    private curriculumService: CurriculumService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAllCourses();
    this.getAllCurriculums();
    this.initForm();
  }

  initForm() {
    this.courseForm = this.fb.group<CourseForm>({
      title: new FormControl("", Validators.required),
      creditHour: new FormControl(null),
      description: new FormControl(""),
      courseCode: new FormControl(""),
      curriculumId: new FormControl(null, Validators.required),
      authorId: new FormControl(null),
      semesterOffered: new FormControl(null),
    });
    this.courseCurriculumSelectionForm = this.fb.group({
      curriculumId: [Validators.required]
    })
  }

  getAllCourses() {
    this.courseService.getCourses().subscribe(x => {
      if (x.data) {
        this.courses = x.data;
      }
    })
  }

  getAllCurriculums() {
    this.curriculumService.getAllCurriculums().subscribe(x => {
      if (x.data) {
        this.curriculums = x.data;
      }
    })
  }


  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }



  submitForm(): void {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

    this.courseService.createCourse(this.courseForm.value as CreateCourseRequest)
      .subscribe((x: BaseResponse<CourseItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.hideDialog();
          this.getAllCourses();

        }
      })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.courseForm.reset();
  }

  onClickReviseBtn(courseId: number): void {
    this.courseService.reviseCourseByCourseId(courseId).subscribe(x => {
      if (x.data) {
        this.router.navigate(['./edit', x.data.id], { relativeTo: this.activatedRoute });
      }
    })
  }

  onClickAddToCurriculumBtn(course: CourseItem): void {
    this.ref = this.dialogService.open(AttachCourseToCurriculumFormComponent, {
      header: 'Add a Curriculum',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      maximizable: true,
      data: {
        curriculums: this.curriculums,
        selectedCourse: course
      }
    });

    this.ref.onClose.subscribe((_) => {
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }

  showDialog() {
    this.isCourseCurriculumSelectionFormVisible = true;
  }

  onClickDeleteBtn(courseId: number): void {
    this.courseService.deleteCourseById(courseId).subscribe(x => {
      if (x.data) {
        this.getAllCourses();
      }
    })
  }


}
