
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantIdentifierKey, TokenHeaderKey, TokenKey, TokenPrefix } from 'src/app/constants/constants';
import { mergeRoutePaths } from './route.helper';

@Injectable({ providedIn: 'root' })
export class BaseDataService {

    baseUrl = 'https://localhost:7061/api/';

    protected getHttpHeaders(isMultiPart: boolean) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
        });

        if (isMultiPart) {
            return headers.append('Content-Type', 'multipart/form-data');
        }
        return headers.append('Content-Type', 'application/json');
    }

    protected getHttpOptions(isMultiPart: boolean, isAuthorized: boolean, observeResponse: boolean) {
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
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
            // headers = headers.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQzOTZhZWFiLTNhMTAtNDIwMS1hYzM0LWE0MTM1OTdjN2QyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQHJvb3QuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlJvb3QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiQWRtaW4iLCJ0ZW5hbnQiOiJSb290IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNjkzMjI1MDAyLCJpc3MiOiJDb3JlSWRlbnRpdHkiLCJhdWQiOiJDb3JlSWRlbnRpdHlVc2VyIn0.9brM5IxQPRU6m69-1E4rFpCx4aQbCWLcdDYGCak4X2c');
        } //TODO: delete the previous line when authentication service is ready

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
