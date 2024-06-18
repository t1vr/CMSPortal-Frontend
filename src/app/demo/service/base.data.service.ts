
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantIdentifierKey, TokenHeaderKey, TokenKey, TokenPrefix } from 'src/app/constants/constants';
import { mergeRoutePaths } from './route.helper';

@Injectable({ providedIn: 'root' })
export class BaseDataService {

  baseUrl = 'https://localhost:5001/api/';

  protected getHttpHeaders(isMultiPart: boolean) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    if (isMultiPart) {
      return headers.append('Content-Type', 'multipart/form-data');
    }
    return headers.append('Content-Type', 'application/json');
  }

  protected getHttpOptions(isMultiPart: boolean, isAuthorized: boolean, observeResponse: boolean, params?: HttpParams) {
    let httpOptions = {
      headers: new HttpHeaders(),
      params: params ?? new HttpParams(),
      "observe?": "response"
    };

    if (observeResponse) {
      httpOptions = {
        headers: new HttpHeaders(),
        params: new HttpParams(),
        "observe?": "response",
      };
    }

    let headers = this.getHttpHeaders(isMultiPart);
    headers = headers.set(TenantIdentifierKey, localStorage.getItem('tenantIdentifier') as string ?? 'public');

    if (isAuthorized) {
      headers = headers.set(TokenHeaderKey, TokenPrefix + localStorage.getItem(TokenKey) as string);
    }

    httpOptions.headers = headers;
    return httpOptions;
  }

  /**
 * @param url specific url endpoint like (users/sign_in)
 * @returns full api url like http://test-api/v1/api/users/sign_in
 */
  protected getFullApiUrl(module: string, url: string,): string {
    const apiBaseUrl = this.baseUrl;
    return mergeRoutePaths([apiBaseUrl, module, url]);
    //return mergeRoutePaths([apiBaseUrl,module, AppRouteUrlConstant.ROUTE_API, apiVersion, url]);

  }

}
