import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MovieSearchResult } from '../models/movie-search-result';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private apiService: ApiService
  ) {}

  async searchMovies(term: string): Promise<MovieSearchResult[]> {
    try {
      const params = {
        s: term
      };
      const result = await this.apiService.getPromise('', params);
      return result.Search;
    } catch (error) {
      throw error;
    }
  }

  async getMovie(id: string): Promise<Movie> {
    try {
      const params = {
        i: id
      };
      return await this.apiService.getPromise('', params);
    } catch (error) {
      throw error;
    }
  }
}
