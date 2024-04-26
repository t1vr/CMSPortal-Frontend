import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddCourseToCurriculumRequest, CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { CourseItem, CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.component.html',
  styleUrls: ['./curriculum-details.component.css']
})
export class CurriculumDetailsComponent implements OnInit {
  curriculumId: number;
  curriculum: CurriculumItem;
  courses: CourseItem[] = [];
  availableCoursesToAttach: CourseItem[] = [];
  dialogVisible: boolean = false;
  selectedcourses: CourseItem[] = [];

  constructor(private curriculumService: CurriculumService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.curriculumId = this.activatedRoute.snapshot.paramMap.get('curriculumId') as unknown as number;
    this.getCurriculumById(this.curriculumId);
  }

  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.data) {
        this.curriculum = x.data;
        this.getAllCourses();
      }
    })
  }

  getAllCourses() {
    this.courseService.getCourses().subscribe(x => {
      if (x.data) {
        this.courses = x.data;
        this.availableCoursesToAttach = x.data.filter(course => !this.curriculum.courseResponses.some(y => y.courseId === course?.courseId));
        console.log(this.availableCoursesToAttach)
      }
    })
  }

  goToCourseDetails(courseRevisionId: number) {
    this.router.navigate(['../../manage-courses', courseRevisionId], { relativeTo: this.activatedRoute });
  }

  showDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  addToCurriculum() {
    let request: AddCourseToCurriculumRequest = {
      courseIds: this.selectedcourses.map(course => course.courseId)
    }
    this.courseService.addCourseToCurriculum(this.curriculumId, request).subscribe(x => {
      if (x.data) {
        this.getCurriculumById(this.curriculumId);
      }
    })
    this.closeDialog();
  }
}
