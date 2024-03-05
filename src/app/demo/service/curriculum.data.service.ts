import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProgramApiConstants } from "src/app/constants/api.constants";
import { BaseResponse, CurriculumItem, CreateCurriculumRequest } from "src/app/models/tenant.model";
import { BaseDataService } from "./base.data.service";

@Injectable({ providedIn: "root" })
export class CurriculumDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllCurriculums(): Observable<BaseResponse<CurriculumItem[]>> {
    return this.httpClient.get<BaseResponse<CurriculumItem[]>>(
      this.getFullApiUrl(ProgramApiConstants.PROGRAM_MODULE, ProgramApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, false, false)
    );
  }

  createCurriculum(createProgramRequest: CreateCurriculumRequest): Observable<BaseResponse<CurriculumItem>> {
    return this.httpClient.post<BaseResponse<CurriculumItem>>(
      this.getFullApiUrl(ProgramApiConstants.PROGRAM_MODULE, ProgramApiConstants.CREATE_ENDPOINT),
      createProgramRequest,
      this.getHttpOptions(false, true, false));
  }
}

