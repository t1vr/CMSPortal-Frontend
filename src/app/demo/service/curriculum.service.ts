import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { BaseResponse, CreateCurriculumRequest, CurriculumItem, UpdateCurriculumRequest, allSemesters } from "src/app/models/tenant.model";
import { CurriculumDataService } from "./curriculum.data.service";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private curriculumDataService: CurriculumDataService) { }

  getCurriculumById(curriculumId: number): Observable<BaseResponse<CurriculumItem>> {
    return this.curriculumDataService.getCurriculumById(curriculumId).pipe(tap(x =>
      x.data.courseResponses?.map(course => {
        if (course.author) {
          course.authorId = course.author?.id;
          course.authorName = course.author?.firstName + ' ' + course.author?.lastName;
          if (course.reviewer)
            course.reviewerName = course.reviewer?.firstName + ' ' + course.reviewer?.lastName;
        }
        course.semesterName = allSemesters.find(semester => semester.value === course.semesterOffered)?.label;

        return course;
      })));
  }


  getAllCurriculums(): Observable<BaseResponse<CurriculumItem[]>> {
    return this.curriculumDataService.getAllCurriculums();
  }

  createCurriculum(createCurriculumRequest: CreateCurriculumRequest): Observable<BaseResponse<CurriculumItem>> {
    return this.curriculumDataService.createCurriculum(createCurriculumRequest);
  }

  updateCurriculum(curriculumId: number, createCurriculumRequest: UpdateCurriculumRequest): Observable<BaseResponse<CurriculumItem>> {
    return this.curriculumDataService.updateCurriculum(curriculumId, createCurriculumRequest);
  }
}
