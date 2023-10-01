import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobAd } from '../../../models/models';

const API_URL = 'http://localhost:3000/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  getJob(id: number): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.get(`${API_URL}/${id}`);
  }

  createJob(params: JobAd): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.post(`${API_URL}`, { ...params });
  }

  updateJob(params: JobAd): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.put(`${API_URL}/${params.id}`, { ...params });
  }

  deleteJob(id: number): Observable<any> {
    return <Observable<JobAd>>this._httpClient.delete(`${API_URL}/${id}`);
  }

  constructor(private readonly _httpClient: HttpClient) {}
}
