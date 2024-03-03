import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CreateCourseRequest, BaseResponse, CourseItem } from 'src/app/models/tenant.model';
import { CourseDataService } from './course.data.service';

@Injectable({ providedIn: 'root' })
export class CourseService {

  constructor(private courseDataService: CourseDataService) {
  }

  createCourse(addCourseRequest: CreateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.createCourse(addCourseRequest);
  }

  getCourses(): Observable<BaseResponse<CourseItem[]>> {
    return this.courseDataService.getCourses();
  }
}
