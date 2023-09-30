import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobAd } from '../../../models/models';

@Injectable({
  providedIn: 'root',
})
export class JobsListService {
  getJobsList(): Observable<JobAd[]> {
    return <Observable<JobAd[]>>this._httpClient.get('http://localhost:3000/jobs');
  }

  constructor(private readonly _httpClient: HttpClient) {}
}
