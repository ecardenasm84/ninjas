import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private readonly apiUrl = 'https://api.api-ninjas.com/v1/exercises';


  private readonly apiKey = 'kD07pV438FAxKmglNvwkhyTr9UeWWMvIYwH7m1mY';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
  }

  searchByMuscle(muscle: string): Observable<Exercise[]> {
    const normalizedMuscle = muscle.trim().toLowerCase();

    return this.http.get<Exercise[]>(
      `${this.apiUrl}?muscle=${normalizedMuscle}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}
