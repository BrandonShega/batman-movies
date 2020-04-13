import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators/';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string;
  private apiKey: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseURL = environment.baseURL;
    this.apiKey = environment.apiKey;
  }

  async getPromise(path: string, options): Promise<any> {
    return await this.get(path, options);
  }

  private async get(path: string, params: any = {}) {
    params.apikey = this.apiKey;
    try {
      const httpParams = new HttpParams({
        fromObject: params
      });
      const response = await this.http.get(`${this.baseURL}${path}`, { params: httpParams }).toPromise();
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(response: HttpErrorResponse) {
    throw Error(response.error.Error);
  }
}
