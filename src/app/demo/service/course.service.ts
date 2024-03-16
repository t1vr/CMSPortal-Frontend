import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCourseRequest, BaseResponse, CourseItem, UpdateCourseRequest } from 'src/app/models/tenant.model';
import { CourseDataService } from './course.data.service';

@Injectable({ providedIn: 'root' })
export class CourseService {

  constructor(private courseDataService: CourseDataService) {
  }

  createCourse(addCourseRequest: CreateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.createCourse(addCourseRequest);
  }

  updateCourseById(courseId: string, updateCourseRequest: UpdateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.updateCourseById(courseId, updateCourseRequest);
  }

  getCourses(): Observable<BaseResponse<CourseItem[]>> {
    return this.courseDataService.getCourses();
  }

  getCourseById(courseId: string): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.getCourseById(courseId);
  }
}
