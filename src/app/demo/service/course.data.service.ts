import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseDataService } from './base.data.service';
import { Observable } from 'rxjs';
import { CourseApiConstants, CurriculumApiConstants } from 'src/app/constants/api.constants';
import { BaseResponse, CourseItem, CreateCourseRequest, UpdateCourseRequest } from 'src/app/models/tenant.model';
import { AddCourseToCurriculumRequest, AssignAuthorsToCourseRevisionRequest } from './course.service';
import { CurriculumModule } from '../components/curriculum/curriculum.module';

@Injectable({ providedIn: "root" })
export class CourseDataService extends BaseDataService {
  assignAuthorsToCourse(courseRevisionId: number, request: AssignAuthorsToCourseRevisionRequest) {
    return this.httpClient.put<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.ASSIGN_AUTHOR_ENDPOINT + courseRevisionId),
      request,
      this.getHttpOptions(false, true, false));
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  getCourses(): Observable<BaseResponse<CourseItem[]>> {
    return this.httpClient.get<BaseResponse<CourseItem[]>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, true, false));
  }

  getCourseById(courseId: number): Observable<BaseResponse<CourseItem>> {
    return this.httpClient.get<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.GET_BY_ID_ENDPOINT + courseId),
      this.getHttpOptions(false, true, false));
  }

  createCourse(createCourseRequest: CreateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.httpClient.post<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.CREATE_ENDPOINT),
      createCourseRequest,
      this.getHttpOptions(false, true, false));
  }

  updateCourseById(courseId: number, updateCourseRequest: UpdateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.httpClient.put<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.UPDATE_ENDPOINT + courseId),
      updateCourseRequest,
      this.getHttpOptions(false, true, false));
  }

  reviseCourseByCourseId(courseId: number): Observable<BaseResponse<CourseItem>> {
    return this.httpClient.post<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.REVISE_ENDPOINT + courseId),
      null,
      this.getHttpOptions(false, true, false));
  }

  getCourseRevisionsByCourseId(courseId: number) {
    return this.httpClient.get<BaseResponse<CourseItem[]>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.GET_ALL_COURSE_REVISIONS_BY_COURSE_ID_ENDPOINT + courseId),
      this.getHttpOptions(false, true, false));
  }

  addCourseToCurriculum(curriculumId: number, request: AddCourseToCurriculumRequest) {
    return this.httpClient.put<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CurriculumApiConstants.CURRICULUM_MODULE, CourseApiConstants.ADD_TO_CURRICULUM_ENDPOINT + curriculumId),
      request,
      this.getHttpOptions(false, true, false));
  }

  deleteCourseById(courseId: number) {
    return this.httpClient.delete<BaseResponse<boolean>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.DELETE_BY_ID_ENDPOINT + courseId),
      this.getHttpOptions(false, true, false));
  }

}
