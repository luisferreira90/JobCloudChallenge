import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BaseListParams,
  Invoice,
  InvoiceDto,
  InvoiceListResponse,
  JobAd,
  JobAdsListResponse,
  JobsListPageParams,
} from '../../../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

// Maps params in our models to the values expected on JSON-SERVER
const FILTERS_MAP = new Map([
  ['page', '_page'],
  ['pageSize', '_limit'],
  ['sort', '_sort'],
  ['order', '_order'],
  ['query', 'title_like'],
  ['status', 'status'],
]);

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  getJobsList(params: JobsListPageParams): Observable<JobAdsListResponse> {
    const paramsCopy = this._updateParamsToJsonServer(params);
    const urlSearchParams = this._returnQueryParams(paramsCopy);

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
    const paramsCopy = this._updateParamsToJsonServer(params);
    const urlSearchParams = this._returnQueryParams(paramsCopy);

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

  getInvoice(id: number): Observable<InvoiceDto> {
    console.log('getting invoice API call');
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('jobAdId', id.toString());
    return <Observable<InvoiceDto>>(
      this._httpClient.get(`${API_URL}/invoices/${id}?${urlSearchParams.toString()}`)
    );
  }

  createInvoice(invoice: InvoiceDto): Observable<InvoiceDto> {
    return <Observable<InvoiceDto>>this._httpClient.post(`${API_URL}/invoices`, invoice);
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

  private _updateParamsToJsonServer(params: BaseListParams): BaseListParams {
    // json-server pages start at 1, while Angular Material's Paginator starts at 0, hence the +1
    // This is a little hack that should not be present in production
    return {
      ...params,
      page: params.page + 1,
    };
  }

  private _returnQueryParams<T>(params: T): URLSearchParams {
    const urlSearchParams = new URLSearchParams();

    const paramsKeys = Object.keys(params);
    paramsKeys.forEach((key: string) => {
      const value = params[key as keyof T];
      if (value) {
        urlSearchParams.set(FILTERS_MAP.get(key), value.toString());
      }
    });

    return urlSearchParams;
  }
}
