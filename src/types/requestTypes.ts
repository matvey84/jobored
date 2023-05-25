export interface IFetchQueryVacancyRequest {
  paginationData: IFetchPaginationRequest;
  token: string;
  x_api_app_id: string;
}

export interface IFetchPaginationRequest {
  page: string | number;
  count: string | number;
}

export interface ISearchQueryParams {
  [published: string]: string;
  keyword: string;
  page: string;
}

export interface IFilterFormData {
  payment_from?: number;
  payment_to?: number;
  catalogues?: string;
}
export interface IFetchQuery {
  published?: number;
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: string;
  page?: number;
}
