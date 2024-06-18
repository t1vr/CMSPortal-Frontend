import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { UiMessageService } from 'src/app/demo/service/ui-message.service';
import { CourseItem, CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-course-review-request',
  templateUrl: './course-review-request.component.html',
  styleUrls: ['./course-review-request.component.css']
})
export class CourseReviewRequestComponent implements OnInit {
  curriculum: CurriculumItem;
  coursesUnderReview: CourseItem[] = [];
  curriculumId: number;

  constructor(private curriculumService: CurriculumService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiMessageService: UiMessageService,
  ) { }

  ngOnInit() {
    this.uiMessageService.getCurrentCurriculumId().subscribe(x => {
      this.curriculumId = x;
      this.getCurriculumById(this.curriculumId);
    })
  }

  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.data) {
        this.curriculum = x.data;
        this.coursesUnderReview = this.curriculum.courseResponses.filter(x => x.reviewer);
        // this.getAllCourses();
      }
    })
  }
}
