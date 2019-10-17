import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName = '';
  bYear = 0;
  actorId = '';
  movName = '';
  year = 0;
  movieId = '';
  ayear = 0;

  constructor(private dbService: DatabaseService) {}

  // Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  // Create a new Actor, POST request
  onSaveActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }
  // Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
    this.movName = '';
    this.year = 0;
  }

  // Get All movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  // Add Movie
  onSaveMovie() {
    const obj = { title: this.movName, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.changeSection(9);
      this.onGetMovies();
    });
  }

  // Add Actor to movie
  onAddActor() {
    const obj = {actorName: this.fullName, movName: this.movName};
    this.dbService.addActor(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetActors();
      this.onGetMovies();
    });
  }

  // Delete Movie
  onDeleteMovie(id) {
    this.dbService.deleteMovie(id).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    });
  }

  // Delete Movie by Year
  removeMovies() {
    this.dbService.deleteMovies(this.ayear).subscribe(result => {
      this.changeSection(9);
      this.onGetMovies();
    });
  }
}
