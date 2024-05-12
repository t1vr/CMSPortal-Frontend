import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CurriculumApiConstants, ProgramApiConstants } from "src/app/constants/api.constants";
import { BaseResponse, CurriculumItem, CreateCurriculumRequest } from "src/app/models/tenant.model";
import { BaseDataService } from "./base.data.service";

@Injectable({ providedIn: "root" })
export class CurriculumDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getCurriculumById(curriculumId: number) {
    return this.httpClient.get<BaseResponse<CurriculumItem>>(
      this.getFullApiUrl(CurriculumApiConstants.CURRICULUM_MODULE, CurriculumApiConstants.GET_BY_ID_ENDPOINT + curriculumId),
      this.getHttpOptions(false, false, false)
    );
  }

  getAllCurriculums(): Observable<BaseResponse<CurriculumItem[]>> {
    return this.httpClient.get<BaseResponse<CurriculumItem[]>>(
      this.getFullApiUrl(CurriculumApiConstants.CURRICULUM_MODULE, CurriculumApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, false, false)
    );
  }

  createCurriculum(createCurriculumRequest: CreateCurriculumRequest): Observable<BaseResponse<CurriculumItem>> {
    return this.httpClient.post<BaseResponse<CurriculumItem>>(
      this.getFullApiUrl(CurriculumApiConstants.CURRICULUM_MODULE, CurriculumApiConstants.CREATE_ENDPOINT),
      createCurriculumRequest,
      this.getHttpOptions(false, true, false));
  }
}

