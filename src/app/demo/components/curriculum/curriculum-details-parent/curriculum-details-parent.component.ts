import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { UiMessageService } from 'src/app/demo/service/ui-message.service';
import { UserService } from 'src/app/demo/service/user.service';
import { CurriculumItem, CourseItem, UserItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-details-parent',
  templateUrl: './curriculum-details-parent.component.html',
  styleUrls: ['./curriculum-details-parent.component.scss']
})
export class CurriculumDetailsParentComponent implements OnInit {
  curriculumId: number;
  curriculum: CurriculumItem;
  courses: CourseItem[] = [];
  availableCoursesToAttach: CourseItem[] = [];
  dialogVisible: boolean = false;
  selectedcourses: CourseItem[] = [];
  selectedFaculty: UserItem;
  faculties: UserItem[];

  constructor(private curriculumService: CurriculumService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiMessageService: UiMessageService) { }

  ngOnInit() {
    this.curriculumId = this.activatedRoute.snapshot.paramMap.get('curriculumId') as unknown as number;
    this.uiMessageService.sendCurrentCurriculumId(this.curriculumId)
    this.getCurriculumById(this.curriculumId);
    this.getAllFaculties();
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
        this.availableCoursesToAttach = x.data
          .filter(course => !this.curriculum.courseResponses.some(y => y.courseId === course?.courseId));
      }
    })
  }

  getAllFaculties() {
    this.userService.getAllUsers().subscribe(x => {
      if (x.data) {
        this.faculties = x.data;
      }
    })
  }
}
