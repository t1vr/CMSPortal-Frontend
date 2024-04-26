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

  courseRevisionId: number;
  course: CourseItem;

  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
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

}
