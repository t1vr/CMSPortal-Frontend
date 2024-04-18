import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/demo/service/course.service';
import { CourseItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  course: CourseItem;

  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId') as unknown as number;
    if (this.courseId)
      this.getCourseById(this.courseId);
  }

  getCourseById(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe(x => {
      if (x.data) {
        this.course = x.data;
      }
    })
  }

  onClickHistoryBtn() {
    this.goToHistoryByCourseId(this.courseId);
  }

  goToHistoryByCourseId(courseId: number) {
    this.router.navigate(['../history', courseId], { relativeTo: this.activatedRoute });
  }

}
