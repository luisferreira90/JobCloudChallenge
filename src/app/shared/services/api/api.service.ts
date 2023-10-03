import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BaseListParams,
  Invoice,
  InvoiceListResponse,
  JobAd,
  JobAdsListResponse,
  JobsListPageParams,
} from '../../../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  filtersMap = new Map([
    ['page', '_page'],
    ['pageSize', '_limit'],
    ['sort', '_sort'],
    ['order', '_order'],
    ['query', '_title_like'],
    ['status', 'status'],
  ]);

  constructor(private readonly _httpClient: HttpClient) {}

  getJobsList(params: JobsListPageParams): Observable<JobAdsListResponse> {
    const urlSearchParams = new URLSearchParams();

    // TODO: Add this into a map to not have to handle each parameter
    // json-server pages start at 1, while Angular Material's Paginator starts at 0, hence the +1
    urlSearchParams.set('_page', (params.page + 1).toString());
    urlSearchParams.set('_limit', params.pageSize.toString());
    if (params.sort && params.order) {
      urlSearchParams.set('_sort', params.sort);
      urlSearchParams.set('_order', params.order);
    }
    if (params.query) {
      urlSearchParams.set('title_like', params.query);
    }
    if (params.status) {
      urlSearchParams.set('status', params.status);
    }

    return <Observable<JobAdsListResponse>>(
      this._httpClient
        .get(`${API_URL}/jobs?${urlSearchParams.toString()}`, { observe: 'response' })
        .pipe(
          map((response) => {
            // Due to the nature of json-server, we need to get this header to know the total job ads we have
            return {
              totalCount: parseInt(<string>response.headers.get('X-Total-Count')),
              jobAds: <JobAd[]>response.body,
            };
          }),
        )
    );
  }

  getJob(id: number): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.get(`${API_URL}/jobs/${id}`);
  }

  createJob(params: Partial<JobAd>): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.post(`${API_URL}/jobs`, { ...params });
  }

  updateJob(params: Partial<JobAd>): Observable<JobAd> {
    return <Observable<JobAd>>this._httpClient.put(`${API_URL}/jobs/${params.id}`, { ...params });
  }

  deleteJobAd(id: number): Observable<object> {
    return <Observable<object>>this._httpClient.delete(`${API_URL}/jobs/${id}`);
  }

  getInvoicesList(params: BaseListParams): Observable<InvoiceListResponse> {
    const urlSearchParams = new URLSearchParams();

    // json-server pages start at 1, while Angular Material's Paginator starts at 0, hence the +1
    urlSearchParams.set('_page', (params.page + 1).toString());
    urlSearchParams.set('_limit', params.pageSize.toString());

    return <Observable<InvoiceListResponse>>(
      this._httpClient
        .get(`${API_URL}/invoices?${urlSearchParams.toString()}`, { observe: 'response' })
        .pipe(
          map((response) => {
            // Due to the nature of json-server, we need to get this header to know the total invoices we have
            return {
              totalCount: parseInt(<string>response.headers.get('X-Total-Count')),
              invoices: <Invoice[]>response.body,
            };
          }),
        )
    );
  }

  createInvoice(invoice: Invoice): Observable<object> {
    return <Observable<object>>this._httpClient.post(`${API_URL}/invoices`, invoice);
  }

  deleteInvoice(id: number): Observable<object> {
    return <Observable<object>>this._httpClient.delete(`${API_URL}/invoices/${id}`);
  }

  getJobTitleAlreadyExists(title: string): Observable<boolean> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('title', title);

    return this._httpClient.get(`${API_URL}/jobs?${urlSearchParams.toString()}`).pipe(
      map((response) => {
        // The map always assumes an object. I need to create an HTTP handler to make this more
        // straightforward, take care of HTTP call responses,
        // and not have to cast, but I am running out of time so for now
        // I will cast directly, and focus on the other important bits
        const castedResponse = <JobAd[]>(<unknown>response);
        return castedResponse.length > 0;
      }),
    );
  }
}
