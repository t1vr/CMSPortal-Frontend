import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse, CreateCurriculumRequest, CurriculumItem } from "src/app/models/tenant.model";
import { CurriculumDataService } from "./curriculum.data.service";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private curriculumDataService: CurriculumDataService) { }

  getCurriculumById(curriculumId: number): Observable<BaseResponse<CurriculumItem>> {
    return this.curriculumDataService.getCurriculumById(curriculumId);
  }


  getAllCurriculums(): Observable<BaseResponse<CurriculumItem[]>> {
    return this.curriculumDataService.getAllCurriculums();
  }

  createCurriculum(createCurriculumRequest: CreateCurriculumRequest): Observable<BaseResponse<CurriculumItem>> {
    return this.curriculumDataService.createCurriculum(createCurriculumRequest);
  }

}
