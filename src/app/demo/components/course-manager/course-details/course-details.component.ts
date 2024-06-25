import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseDisciplineService } from 'src/app/demo/service/course-discipline.service';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurrentUserService } from 'src/app/demo/service/current.user.service';
import { UserService } from 'src/app/demo/service/user.service';
import { AssignReviewersForCourseRevisionRequest, BaseResponse, CourseDisciplineItem, CourseForm, CourseItem, CourseRevisionStatus, CourseType, UpdateCourseRequest, UpdateCourseRevisionStatusRequest, UserItem } from 'src/app/models/tenant.model';
import { PermissionService } from '../../../service/permission.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [MessageService]
})
export class CourseDetailsComponent implements OnInit {
  courseForm: FormGroup<CourseForm>;
  courseRevisionId: number;
  course: CourseItem;
  CourseRevisionStatus = CourseRevisionStatus;
  courseTypes = [];
  hasCourseEditPermission = true;
  faculties: UserItem[];
  isLoading = false;
  isTitleInputActive = false;
  semesterName: string;

  semesters: any[] = [
    { label: '1st Year 1st Semester', value: 1 },
    { label: '1st Year 2nd Semester', value: 2 },
    { label: '2nd Year 1st Semester', value: 3 },
    { label: '2nd Year 2nd Semester', value: 4 },
    { label: '3rd Year 1st Semester', value: 5 },
    { label: '3rd Year 2nd Semester', value: 6 },
    { label: '4th Year 1st Semester', value: 7 },
    { label: '4th Year 2nd Semester', value: 8 }
  ]
  courseType: string;
  hasCourseSetInProgressPermission: boolean;
  hasCourseSetToReviewPermission: boolean;
  hasCourseApprovePermission: boolean;
  hasCourseMetaDataPermission: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private courseDisciplineService: CourseDisciplineService,
    private currentUser: CurrentUserService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.courseRevisionId = this.activatedRoute.snapshot.paramMap.get('courseRevisionId') as unknown as number;
    if (this.courseRevisionId)
      this.getCourseById(this.courseRevisionId);

    this.initForm();
    this.getAllFaculties();

    this.courseTypes = Object.keys(CourseType).map(key => ({ label: CourseType[key], value: key }));

  }

  initForm() {
    this.courseForm = this.fb.group<CourseForm>({
      title: new FormControl("", Validators.required),
      creditHour: new FormControl(null),
      description: new FormControl(""),
      courseCode: new FormControl(""),
      curriculumId: new FormControl(null, Validators.required),
      semesterOffered: new FormControl(null),
      authorId: new FormControl(null),
      courseDisciplineId: new FormControl(null),
      courseCategory: new FormControl(null),
      courseType: new FormControl(null),
    });
  }

  getAllFaculties() {
    this.userService.getAllUsers().subscribe(x => {
      if (x.data) {
        this.faculties = x.data;
      }
    })
  }

  submitForm(): void {
    this.updateCourse();
  }

  onClickSaveBtn() {
    this.updateCourse(this.course.title);
  }

  updateCourse(title?: string) {
    let request = this.courseForm.value as UpdateCourseRequest;
    request.title = title ?? request.title;
    request.courseType = Number(this.courseForm.value.courseType) as CourseType
    console.log(request.courseType)
    this.isLoading = true;

    this.courseService.updateCourseById(this.courseRevisionId, this.courseForm.value as UpdateCourseRequest)
      .subscribe((x: BaseResponse<CourseItem>) => {
        if (x.data) {
          this.isLoading = false;
          this.isTitleInputActive = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save change information', life: 3000 });
        }
      });
  }

  getCourseById(courseRevisionId: number) {
    this.courseService.getCourseById(courseRevisionId).subscribe(x => {
      if (x.data) {
        this.course = x.data;
        this.hasCourseEditPermission = this.course.authorId === this.currentUser.getCurrentUser()?.id
          && this.permissionService.hasPermissions(['Permissions.Courses.Update'])
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.Approved
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.UnderReview
          && this.course?.courseRevisionStatus === CourseRevisionStatus.InProgress

        this.hasCourseSetInProgressPermission = this.permissionService.hasPermissions(['Permissions.Courses.Update'])
          && (this.course.authorId === this.currentUser.getCurrentUser()?.id || this.course.reviewerId === this.currentUser.getCurrentUser()?.id)
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.Approved
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.InProgress

        this.hasCourseSetToReviewPermission = this.permissionService.hasPermissions(['Permissions.Courses.Update'])
          && (this.course.authorId === this.currentUser.getCurrentUser()?.id)
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.Approved
          && this.course?.courseRevisionStatus !== CourseRevisionStatus.UnderReview

        this.hasCourseApprovePermission = this.permissionService.hasPermissions(['Permissions.Courses.Approve'])
          && (this.course.reviewerId === this.currentUser.getCurrentUser()?.id)
          && this.course?.courseRevisionStatus === CourseRevisionStatus.UnderReview

        this.hasCourseMetaDataPermission = this.hasCourseSetInProgressPermission;

        this.semesterName = this.semesters.find(semester => semester.value === x.data.semesterOffered)?.label;
        this.courseType = CourseType[x.data.courseType];
        this.courseForm.patchValue({ ...x.data, authorId: x.data.author.id, courseDisciplineId: x.data.courseDisciplineResponse?.id });
        this.getAllCourseDisciplines(x.data.curriculumId);
      }
    })
  }

  courseDisciplines: CourseDisciplineItem[] = [];
  getAllCourseDisciplines(curriculumId: number) {
    this.courseDisciplineService.getAllCourseDisciplines(curriculumId).subscribe(x => {
      if (x.succeeded && x.data) {
        this.courseDisciplines = x.data;
      }
    })
  }

  onClickHistoryBtn() {
    this.goToHistoryBycourseRevisionId(this.course.courseId);
  }

  goToHistoryBycourseRevisionId(courseRevisionId: number) {
    this.router.navigate(['../history', courseRevisionId], { relativeTo: this.activatedRoute });
  }


  goToEditCourse(courseRevisionId: number) {
    this.router.navigate(['../edit', courseRevisionId], { relativeTo: this.activatedRoute });
  }

  onClickApproveBtn() {
    let request: UpdateCourseRevisionStatusRequest = {
      courseRevisionStatus: CourseRevisionStatus.Approved,
    }
    this.courseService.updateCourseRevisionStatus(this.courseRevisionId, request).subscribe((x) => {
      if (x.data) {
        this.course = x.data;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }
    })
  }

  isLoadingReviewBtn = false;
  onClickSetToReviewBtn() {
    this.isLoadingReviewBtn = true;

    let statusToBeSaved = this.course.courseRevisionStatus && this.course.courseRevisionStatus === CourseRevisionStatus.InProgress
      ? CourseRevisionStatus.UnderReview
      : CourseRevisionStatus.InProgress
    let request: UpdateCourseRevisionStatusRequest = {
      courseRevisionStatus: statusToBeSaved
    }
    this.courseService.updateCourseRevisionStatus(this.courseRevisionId, request).subscribe((x) => {
      this.isLoadingReviewBtn = false;
      if (x.succeeded) {
        this.course = x.data;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Set it for review' });
      }
    }, () => {
      this.isLoadingReviewBtn = false;

    })
  }

  onChangeReviewerName(event) {
    let reviewerId = event.value;
    let request: AssignReviewersForCourseRevisionRequest = {
      reviewerIds: [reviewerId]
    }
    this.courseService.assignReviewersToCourse(this.courseRevisionId, request).subscribe(x => {
      if (x.succeeded) {

      }
    })
  }
}
