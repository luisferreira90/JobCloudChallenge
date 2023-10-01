import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobAd } from '../../../models/models';

const API_URL = 'http://localhost:3000/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private readonly _httpClient: HttpClient) {}

  getJob(id: number): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.get(`${API_URL}/${id}`);
  }

  createJob(params: Partial<JobAd>): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.post(`${API_URL}`, { ...params });
  }

  updateJob(params: Partial<JobAd>): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.put(`${API_URL}/${params.id}`, { ...params });
  }
}
