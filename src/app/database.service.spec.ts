import { TestBed } from '@angular/core/testing';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
