export interface JobAd {
  id: number;
  /**
   * Title of a job ad. Required property.
   * It's not allowed to have two job ads with the same title.
   */
  title: string;
  /**
   * Description of a job ad. Required property.
   * Its length should not be less than 10 characters.
   */
  description: string;
  /**
   * List of skills required for a job ad.
   */
  skills: string[];
  /**
   * When a job ad has a "draft" status, it can be switched to "published" or "archived".
   * When a job ad has a "published" status, it can be only switched to "archived".
   * When a job ad has an "archived" status, it cannot be updated.
   */
  status: JobAdStatus;
}

export interface JobAdsListResponse {
  jobAds: JobAd[];
  totalCount: number;
}

export interface InvoiceListResponse {
  invoices: Invoice[];
  totalCount: number;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';

export interface Invoice {
  id: number;
  jobAdId: number;
  amount: unknown; // up to you
  dueDate: Date;
}

export interface JobAdDto extends JobAd {
  // DTO properties that are not part of the model
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}

export interface InvoiceDto extends Invoice {
  // DTO properties that are not part of the model
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}

export interface BaseListParams {
  page: number;
  pageSize: number;
}

export interface JobsListPageParams extends BaseListParams {
  query?: string;
  status?: JobAdStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
