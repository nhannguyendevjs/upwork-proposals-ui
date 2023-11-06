import { HttpHeaders } from '@angular/common/http';

export interface ODataParams {
  [k: string]: any;
  $skip?: number;
  $top?: number;
  $filter?: string;
  $count?: boolean;
  $expand?: string;
  $orderby?: string;
  $select?: string;
}

export interface ODataResponse<T> {
  [k: string]: any;
  value: T;
}

export interface HttpOptions {
  [k: string]: any;
  headers?: HttpHeaders;
  params?: ODataParams;
}
