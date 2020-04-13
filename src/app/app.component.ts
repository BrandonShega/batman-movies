import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  movies: Movie[];
  originalMovies: Movie[];
  selectedYear: number;

  constructor(
    private notificationService: NotificationService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    try {
      const result = await this.movieService.searchMovies('Batman');
      this.movies = await Promise.all(result.map(movie => this.movieService.getMovie(movie.imdbID)));
      this.originalMovies = this.movies;
    } catch (error) {
      this.notificationService.show(error);
    }
  }

  filterYear(year: number) {
    this.movies = this.originalMovies;
    if (year === this.selectedYear) {
      this.selectedYear = null;
      return;
    }
    this.selectedYear = year;
    this.movies = this.movies.filter(movie => {
      const releaseYear = parseInt(movie.Released.split(' ').pop(), 10);
      return releaseYear >= year && releaseYear < year + 10;
    });
  }
}
