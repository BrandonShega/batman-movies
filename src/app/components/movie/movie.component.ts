import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  get posterURL(): string {
    const poster = this.movie.Poster.split('/').pop();
    return `assets/${poster}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
