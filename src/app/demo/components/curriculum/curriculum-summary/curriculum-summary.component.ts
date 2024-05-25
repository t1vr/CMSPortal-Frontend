import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { UserService } from 'src/app/demo/service/user.service';
import { CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-summary',
  templateUrl: './curriculum-summary.component.html',
  styleUrls: ['./curriculum-summary.component.css']
})
export class CurriculumSummaryComponent implements OnInit {
  curriculumId: number;
  curriculum: CurriculumItem;

  constructor(private curriculumService: CurriculumService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.curriculumId = this.activatedRoute.snapshot.paramMap.get('curriculumId') as unknown as number;
    this.getCurriculumById(this.curriculumId);
  }

  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.data) {
        this.curriculum = x.data;
      }
    })
  }
}
