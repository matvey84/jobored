export interface IFetchQueryVacancyRequest {
  paginationData: IFetchPaginationRequest;
  token: string;
  x_api_app_id: string;
}

export interface IFetchPaginationRequest {
  page: string | number;
  count: string | number;
}
