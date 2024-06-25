import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from 'primeng/api';
import { AddCourseToCurriculumRequest, AssignAuthorsToCourseRevisionRequest, CourseService } from 'src/app/demo/service/course.service';
import { CurrentUserService } from 'src/app/demo/service/current.user.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { UiMessageService } from 'src/app/demo/service/ui-message.service';
import { UserService } from 'src/app/demo/service/user.service';
import { BaseResponse, CourseItem, CourseRevisionStatus, CreateCourseRequest, CurriculumItem, UserItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.component.html',
  styleUrls: ['./curriculum-details.component.css'],
})
export class CurriculumDetailsComponent implements OnInit {

  curriculumId: number;
  curriculum: CurriculumItem;
  courses: CourseItem[] = [];
  availableCoursesToAttach: CourseItem[] = [];
  dialogVisible: boolean = false;
  selectedcourses: CourseItem[] = [];
  selectedFaculty: UserItem;
  faculties: UserItem[];
  appliedFilters: any = {
    mine: {
      isSelected: false
    },
    assignee: {
      selectedAuthors: [],
      isSelected: false
    }
  };
  CourseRevisionStatus = CourseRevisionStatus;
  courseTitle: string;
  isCourseTitleLoading = false;
  isSaveCourseBtnVisible = false;
  constructor(private curriculumService: CurriculumService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiMessageService: UiMessageService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.uiMessageService.getCurrentCurriculumId().subscribe(x => {
      this.curriculumId = x;
      this.getCurriculumById(this.curriculumId);

    })
    this.getAllFaculties();
  }

  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.data) {
        this.curriculum = x.data;
        this.filteredCourses = this.curriculum.courseResponses;
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
      console.log('----------->', this.availableCoursesToAttach)
    })
  }

  goToCourseDetails(courseRevisionId: number) {
    this.router.navigate(['../../../manage-courses', courseRevisionId], { relativeTo: this.activatedRoute });
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

  onChangeAuthor(courseRevision: CourseItem) {
    this.selectedFaculty = this.faculties.find(x => x.id === courseRevision.authorId);
    this.curriculum.courseResponses = this.curriculum.courseResponses.map(x => {
      if (x.id === courseRevision.id)
        x.authorName = this.selectedFaculty?.firstName
      return x;
    })

    let request = { authorId: courseRevision.authorId } as AssignAuthorsToCourseRevisionRequest;

    this.courseService.assignAuthorsToCourse(courseRevision.id, request).subscribe(x => {
      if (x.data) {

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

  filteredCourses: CourseItem[] = [];

  onClickAssignedToMe() {
    this.filteredCourses = [];
    this.findCoursesByAuthors();
  }

  onSelectAuthors() {
    this.filteredCourses = [];
    this.findCoursesByAuthors();
  }

  findCoursesByAuthors() {
    let currentUserFullName = this.currentUserService.getCurrentUser().fullName;
    if (this.appliedFilters.mine.isSelected) {
      this.appliedFilters.assignee.selectedAuthors.push(currentUserFullName);
    } else {
      this.appliedFilters.assignee.selectedAuthors = this.appliedFilters.assignee.selectedAuthors.filter(name => name !== currentUserFullName)
    }

    if (this.appliedFilters.assignee.selectedAuthors.length > 0) {
      let courses = this.curriculum.courseResponses.filter(course => {
        return this.appliedFilters.assignee.selectedAuthors.includes(course.authorName)
      })
      this.filteredCourses.push(...courses);

    }
    if (this.appliedFilters.assignee.selectedAuthors.length === 0) {
      this.filteredCourses = this.curriculum.courseResponses;
    }
  }

  onClickCreateBtn() {
    this.isSaveCourseBtnVisible = true;
    this.saveCourse();
  }
  saveCourse() {
    this.isCourseTitleLoading = true;
    let request: CreateCourseRequest = {
      title: this.courseTitle,
      curriculumId: this.curriculumId,
      courseCode: null,
      creditHour: 0,
      semesterOffered: null,
      authorId: null,
      description: ""
    }
    this.courseService.createCourse(request)
      .subscribe(
        (x: BaseResponse<CourseItem>) => {
          if (x.succeeded) {
            // this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
            this.getCurriculumById(this.curriculumId);
            this.isCourseTitleLoading = false;
            this.isSaveCourseBtnVisible = false;
          }
        },
        () => {
          this.isCourseTitleLoading = false;
          this.isSaveCourseBtnVisible = false;
        });
  }

  members = [
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
  ];
}
