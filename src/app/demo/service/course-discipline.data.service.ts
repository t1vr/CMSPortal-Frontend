import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base.data.service';
import { CourseDisciplineItem, CreateCourseDisciplineRequest, UpdateCourseDisciplineRequest } from '../components/curriculum/interdisciplinary-courses/interdisciplinary-courses.component';
import { CourseDisciplineApiConstants } from 'src/app/constants/api.constants';
import { BaseResponse } from 'src/app/models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class CourseDisciplineDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllCourseDisciplines(curriculumId: number): Observable<BaseResponse<CourseDisciplineItem[]>> {
    return this.httpClient.get<BaseResponse<CourseDisciplineItem[]>>(
      this.getFullApiUrl(CourseDisciplineApiConstants.COURSE_DISCIPLINE_MODULE, CourseDisciplineApiConstants.GET_ALL_ENDPOINT + curriculumId),
      this.getHttpOptions(false, true, false));
  }


  createCourseDiscipline(createCourseDisciplineRequest: CreateCourseDisciplineRequest): Observable<BaseResponse<CourseDisciplineItem>> {
    return this.httpClient.post<BaseResponse<CourseDisciplineItem>>(
      this.getFullApiUrl(CourseDisciplineApiConstants.COURSE_DISCIPLINE_MODULE, CourseDisciplineApiConstants.CREATE_ENDPOINT),
      createCourseDisciplineRequest,
      this.getHttpOptions(false, true, false));
  }

  updateCourseDisciplineById(courseDisciplineId: number, updateCourseDisciplineRequest: UpdateCourseDisciplineRequest): Observable<BaseResponse<CourseDisciplineItem>> {
    return this.httpClient.put<BaseResponse<CourseDisciplineItem>>(
      this.getFullApiUrl(CourseDisciplineApiConstants.COURSE_DISCIPLINE_MODULE, CourseDisciplineApiConstants.UPDATE_ENDPOINT + courseDisciplineId),
      updateCourseDisciplineRequest,
      this.getHttpOptions(false, true, false));
  }


  deleteCourseDisciplineById(courseDisciplineId: number) {
    return this.httpClient.delete<BaseResponse<boolean>>(
      this.getFullApiUrl(CourseDisciplineApiConstants.COURSE_DISCIPLINE_MODULE, CourseDisciplineApiConstants.DELETE_ENDPOINT + courseDisciplineId),
      this.getHttpOptions(false, true, false));
  }

}
