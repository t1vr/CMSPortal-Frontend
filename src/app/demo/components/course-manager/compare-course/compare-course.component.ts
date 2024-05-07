import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CourseService } from 'src/app/demo/service/course.service';
import { CourseItem } from 'src/app/models/tenant.model';
import { HtmlDiffService } from './htm.diff.service';

@Component({
  selector: 'app-compare-course',
  templateUrl: './compare-course.component.html',
  styleUrls: ['./compare-course.component.scss']
})
export class CompareCourseComponent implements OnInit {

  compare() {
    this.originalHTML = this.sourceCourseRevisions.find(x => x.id === this.sourceCourseRevisionId).description;
    this.newHTML = this.sourceCourseRevisions.find(x => x.id === this.targetCourseRevisionId).description;
    this.diffOutput = this.htmlDiffService.diff(this.originalHTML, this.newHTML)

  }

  originalHTML: string;

  newHTML: string;

  diffOutput: string = '';
  items: MenuItem[] | undefined;
  sourceCourseRevisionId: number;
  sourceCourseRevisions: CourseItem[] = [];
  targetCourseRevisions: CourseItem[] = [];
  targetCourseRevisionId: number;

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private htmlDiffService: HtmlDiffService) {
  }

  ngOnInit() {
    this.sourceCourseRevisionId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('courseRevisionId'));
    this.getCourseById(this.sourceCourseRevisionId);
  }

  getCourseById(courseRevisionId: number) {
    this.courseService.getCourseById(courseRevisionId).subscribe(x => {
      if (x.data) {
        this.getAllCourseRevisionsByCourseId(x.data.courseId);
      }
    })
  }

  getAllCourseRevisionsByCourseId(courseId: number) {
    this.courseService.getCourseRevisionsByCourseId(courseId).subscribe(x => {
      if (x.data) {
        this.sourceCourseRevisions = x.data;
        this.targetCourseRevisions = x.data.filter(course => course.id !== this.sourceCourseRevisionId);
      }
    })
  }
}


