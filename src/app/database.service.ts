import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get('/actors');
  }

  getActor(id: string) {
    const url = '/actors/' + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }

  updateActor(id, data) {
    const url = '/actors/' + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id) {
    const url = '/actors/' + id;
    return this.http.delete(url, httpOptions);
  }

  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }

  getMovies() {
    return this.http.get('/movies');
  }

  getMovie(id: string) {
    const url = '/movies/' + id;
    return this.http.get(url);
  }

  addActor(data) {
    return this.http.post('/movies/' + data.movName + '/' + data.actorName, httpOptions);
  }

  addMovie(data) {
    return this.http.post('/actors/' + data.actorName + '/' + data.movName, httpOptions);
  }

  deleteMovie(id) {
    return this.http.delete('/movies/' + id, httpOptions);
  }

  deleteMovies(year) {
    const url = '/movies/year/' + year;
    return this.http.delete(url, httpOptions);
  }
}
