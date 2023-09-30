import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobAd } from '../../../models/models';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  getJob(id: number): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.get(`http://localhost:3000/jobs/${id}`);
  }

  createJob(params: JobAd): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.post(`http://localhost:3000/jobs`, { ...params });
  }

  updateJob(params: JobAd): Observable<JobAd> {
    return <Observable<JobAd>>(
      this._httpClient.put(`http://localhost:3000/jobs/${params.id}`, { ...params })
    );
  }

  constructor(private readonly _httpClient: HttpClient) {}
}
