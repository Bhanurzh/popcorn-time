import { Film, Review } from "./shares";

export interface FilmListResponse {
  dates?: Dates;
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export interface FilmReviewResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}
