import { Component } from '@angular/core';

import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-search',
  standalone: false,
  templateUrl: './exercise-search.component.html',
  styleUrl: './exercise-search.component.css'
})
export class ExerciseSearchComponent {

  muscle = 'biceps';
  exercises: Exercise[] = [];
  loading = false;
  errorMessage = '';
  searchedMuscle = '';

  muscleExamples = ['biceps', 'chest', 'back', 'legs', 'triceps', 'shoulders', 'abs'];

  constructor(private exerciseService: ExerciseService) { }

  searchExercises(): void {
    const muscleToSearch = this.muscle.trim();

    if (!muscleToSearch) {
      this.errorMessage = 'Ingresa un músculo para realizar la búsqueda.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.exercises = [];
    this.searchedMuscle = muscleToSearch;

    this.exerciseService.searchByMuscle(muscleToSearch).subscribe({
      next: (response: Exercise[]) => {
        this.exercises = response;
        this.loading = false;

        if (response.length === 0) {
          this.errorMessage = 'No se encontraron ejercicios para ese músculo.';
        }
      },
      error: (error) => {
        console.error('Error al consultar API Ninjas:', error);
        this.errorMessage = 'No se pudo consultar la API. Revisa tu API Key en exercise.service.ts.';
        this.loading = false;
      }
    });
  }

  selectExample(muscle: string): void {
    this.muscle = muscle;
    this.searchExercises();
  }

  trackByExerciseName(index: number, exercise: Exercise): string {
    return `${exercise.name}-${index}`;
  }
}
