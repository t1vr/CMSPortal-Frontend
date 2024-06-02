import { Injectable } from '@angular/core';
import { CourseDisciplineDataService } from './course-discipline.data.service';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/tenant.model';
import { CourseDisciplineItem, CreateCourseDisciplineRequest, UpdateCourseDisciplineRequest } from '../components/curriculum/interdisciplinary-courses/interdisciplinary-courses.component';

@Injectable({
  providedIn: 'root'
})
export class CourseDisciplineService {

  constructor(private courseDisciplineDataService: CourseDisciplineDataService) { }

  getAllCourseDisciplines(curriculumId: number): Observable<BaseResponse<CourseDisciplineItem[]>> {
    return this.courseDisciplineDataService.getAllCourseDisciplines(curriculumId);
  }


  createCourseDiscipline(createCourseDisciplineRequest: CreateCourseDisciplineRequest): Observable<BaseResponse<CourseDisciplineItem>> {
    return this.courseDisciplineDataService.createCourseDiscipline(createCourseDisciplineRequest);
  }

  updateCourseDisciplineById(courseDisciplineId: number, updateCourseDisciplineRequest: UpdateCourseDisciplineRequest): Observable<BaseResponse<CourseDisciplineItem>> {
    return this.courseDisciplineDataService.updateCourseDisciplineById(courseDisciplineId, updateCourseDisciplineRequest);
  }


  deleteCourseDisciplineById(courseDisciplineId: number) {
    return this.courseDisciplineDataService.deleteCourseDisciplineById(courseDisciplineId);

  }

}
