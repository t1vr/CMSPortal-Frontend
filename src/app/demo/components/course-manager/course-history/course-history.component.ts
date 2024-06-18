import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { CourseItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-course-history',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.css']
})
export class CourseHistoryComponent implements OnInit {

  courseRevisions: CourseItem[] = [];
  courseId: number;
  events: any[];
  latestCourseRevision: CourseItem;

  constructor(private courseService: CourseService,
    private curriculumService: CurriculumService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId') as unknown as number;
    this.getAllCourseRevisionsByCourseId(this.courseId);
  }

  getAllCourseRevisionsByCourseId(courseId: number) {
    this.courseService.getCourseRevisionsByCourseId(courseId).subscribe(x => {
      if (x.data) {
        this.courseRevisions = x.data;
        this.latestCourseRevision = this.courseRevisions.reduce((maxObj, currentObj) =>
          currentObj.id > maxObj.id ? currentObj : maxObj
        );
      }
    })
  }

  goToComparePage(courseRevisionId: number) {
    this.router.navigate(['../../compare'], {
      relativeTo: this.activatedRoute, queryParams: {
        courseRevisionId: courseRevisionId
      },
    });

  }

}
