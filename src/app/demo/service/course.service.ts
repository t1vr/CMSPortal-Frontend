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

  updateCourseById(courseId: number, updateCourseRequest: UpdateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.updateCourseById(courseId, updateCourseRequest);
  }

  getCourses(): Observable<BaseResponse<CourseItem[]>> {
    return this.courseDataService.getCourses();
  }

  getCourseById(courseId: number): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.getCourseById(courseId);
  }

  reviseCourseByCourseId(courseId: number): Observable<BaseResponse<CourseItem>> {
    return this.courseDataService.reviseCourseByCourseId(courseId);
  }

  getCourseRevisionsByCourseId(courseId: number) {
    return this.courseDataService.getCourseRevisionsByCourseId(courseId);
  }

  addCourseToCurriculum(courseId: number, request: AddCourseToCurriculumRequest) {
    return this.courseDataService.addCourseToCurriculum(courseId, request);
  }

  deleteCourseById(courseId: number) {
    return this.courseDataService.deleteCourseById(courseId);
  }
}


export interface AddCourseToCurriculumRequest {
  curriculumId: number;
}
