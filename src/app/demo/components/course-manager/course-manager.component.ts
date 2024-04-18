import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from '../../api/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseResponse, CourseForm, CourseItem, CreateCourseRequest, CurriculumItem } from 'src/app/models/tenant.model';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculumService } from '../../service/curriculum.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss'],
  providers: [MessageService, ConfirmationService]
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

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
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
      creditHour: new FormControl(null, Validators.required),
      description: new FormControl("", Validators.required),
      courseCode: new FormControl("", Validators.required),
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

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  submitForm(): void {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

    console.log(this.courseForm.value)
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

  onClickAddToCurriculumBtn(courseId: number): void {
    this.showDialog();
    // this.courseService.reviseCourseByCourseId(courseId).subscribe(x => {
    //   if (x.data) {
    //     this.router.navigate(['./edit', x.data.id], { relativeTo: this.activatedRoute });
    //   }
    // })
  }

  showDialog() {
    this.isCourseCurriculumSelectionFormVisible = true;
  }

}
