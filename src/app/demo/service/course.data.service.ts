import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseDataService } from './base.data.service';
import { Observable } from 'rxjs';
import { CourseApiConstants } from 'src/app/constants/api.constants';
import { BaseResponse, CourseItem, CreateCourseRequest } from 'src/app/models/tenant.model';

@Injectable({ providedIn: "root" })
export class CourseDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getCourses(): Observable<BaseResponse<CourseItem[]>> {
    return this.httpClient.get<BaseResponse<CourseItem[]>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, true, false));
  }

  createCourse(createCourseRequest: CreateCourseRequest): Observable<BaseResponse<CourseItem>> {
    return this.httpClient.post<BaseResponse<CourseItem>>(
      this.getFullApiUrl(CourseApiConstants.COURSE_MODULE, CourseApiConstants.CREATE_ENDPOINT),
      createCourseRequest,
      this.getHttpOptions(false, true, false));
  }

}
