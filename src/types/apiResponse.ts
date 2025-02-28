import { Film, Review } from "./shares";

export interface FilmListResponse {
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
