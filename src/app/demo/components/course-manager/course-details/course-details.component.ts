import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseService } from 'src/app/demo/service/course.service';
import { CourseItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [MessageService]
})
export class CourseDetailsComponent implements OnInit {

  courseRevisionId: number;
  course: CourseItem;
  CourseRevisionStatus = CourseRevisionStatus;

  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.courseRevisionId = this.activatedRoute.snapshot.paramMap.get('courseRevisionId') as unknown as number;
    if (this.courseRevisionId)
      this.getCourseById(this.courseRevisionId);
  }

  getCourseById(courseRevisionId: number) {
    this.courseService.getCourseById(courseRevisionId).subscribe(x => {
      if (x.data) {
        this.course = x.data;
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
}

export enum CourseRevisionStatus {
  Assigned,
  InProgress,
  InReview,
  Approved
}

export interface UpdateCourseRevisionStatusRequest {
  courseRevisionStatus: CourseRevisionStatus;
}
