import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDisciplineService } from 'src/app/demo/service/course-discipline.service';
import { UiMessageService } from '../../../service/ui-message.service';

@Component({
  selector: 'app-interdisciplinary-courses',
  templateUrl: './interdisciplinary-courses.component.html',
  styleUrls: ['./interdisciplinary-courses.component.css']
})
export class InterdisciplinaryCoursesComponent implements OnInit {

  curriculumId: number;
  courseDisciplines: CourseDisciplineItem[] = [];

  dialogVisible = false;
  courseDisciplineTitle: string;

  constructor(private courseDisciplineService: CourseDisciplineService,
    private activatedRoute: ActivatedRoute,
    private uiMessageService: UiMessageService) { }

  ngOnInit() {
    this.uiMessageService.getCurrentCurriculumId().subscribe(x => this.curriculumId = x);
    this.getAllCourseDisciplines();
  }

  getAllCourseDisciplines() {
    this.courseDisciplineService.getAllCourseDisciplines(this.curriculumId).subscribe(x => {
      if (x.succeeded && x.data) {
        this.courseDisciplines = x.data;
      }
    })
  }

  isLoading = false;
  onClickAddBtn() {
    if (!this.courseDisciplineTitle) return;

    this.isLoading = true;
    let request: CreateCourseDisciplineRequest = {
      title: this.courseDisciplineTitle,
      curriculumId: this.curriculumId
    }
    this.createCourseDiscipline(request);
  }

  createCourseDiscipline(request: CreateCourseDisciplineRequest) {
    this.courseDisciplineService.createCourseDiscipline(request).subscribe(x => {
      if (x.succeeded && x.data) {
        this.getAllCourseDisciplines();
      }
      this.isLoading = false;

    });
  }
}


export interface CourseDisciplineItem {
  id: number;
  title: string;
}

export interface CreateCourseDisciplineRequest {
  title: string;
  curriculumId: number | null;
}

export interface UpdateCourseDisciplineRequest {
  title: string;
}
