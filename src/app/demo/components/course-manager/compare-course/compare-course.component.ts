import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CourseService } from 'src/app/demo/service/course.service';
import { CourseItem } from 'src/app/models/tenant.model';
import { HtmlDiffService } from './htm.diff.service';

@Component({
  selector: 'app-compare-course',
  templateUrl: './compare-course.component.html',
  styleUrls: ['./compare-course.component.scss'],
})
export class CompareCourseComponent implements OnInit {
  sourceCourseRevision: CourseItem;
  targetCourseRevision: CourseItem;

  compare() {
    this.sourceCourseRevision = this.sourceCourseRevisions.find(x => x.id === this.sourceCourseRevisionId);
    this.targetCourseRevision = this.sourceCourseRevisions.find(x => x.id === this.targetCourseRevisionId);
    this.diffOutput = this.htmlDiffService.diff(this.sourceCourseRevision.description, this.targetCourseRevision.description)

  }


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
        // this.targetCourseRevisions = x.data.filter(course => course.id !== this.sourceCourseRevisionId);
        this.targetCourseRevisions = x.data;

      }
    })
  }

  // originalHTML = `
  // <p>Hello Mr. Wayne, decide what to do:</p>
  // <span> Entertainment Session </span>
  // <label> Country Second </label>
  // <table>
  // <tbody>
  // <tr>
  // <td>s</td>
  // <td>a</td>
  // <td>b1</td>
  // </tr>
  // <tr>
  // <td>s</td>
  // <td>y</td>
  // <td>x</td>
  // </tr>
  // <tr>
  // <td>s</td>
  // <td>1</td>
  // <td>2</td>
  // </tr>
  // </tbody>
  // </table>

  // <ul><li>Kill The Joker</li><li>Save Thalia Al Gul</li><li>Save Gotham</li></ul><h4>I am a heading 4</h4>`;

  // newHTML = `<p>Hello Mr. Wayne, decide what to do:</p>

  // <span> Entertainment Session general</span>
  // <label> Country First </label>
  // <p>Call Alfred, take Thalia Al Gul to the cinema, save Gotham</p>
  // <table>
  // <tbody>
  // <tr>
  // <td>s</td>
  // <td>a</td>
  // <td>b1</td>
  // </tr>
  // <tr>
  // <td>s</td>
  // <td>y</td>
  // <td>x</td>
  // </tr>
  // <tr>
  // <td><p>ssiludfhgljkshdflkgjhlskdfjg bkm,nb,mnb,mnb,mnb ,mnb,mnb,mnb ,mnb,mnb ,mnb ,mnb ,mnb ,mnb,mnb ,mnb </p></td>
  // <td>1</td>
  // <td>2</td>
  // </tr>
  // </tbody>
  // </table>
  // <span>Use the mouse to choose an option.</span>`;
}


