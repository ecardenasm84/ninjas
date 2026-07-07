import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExerciseSearchComponent } from './components/exercise-search/exercise-search.component';

const routes: Routes = [
  { path: 'ejercicios', component: ExerciseSearchComponent },
  { path: '', redirectTo: 'ejercicios', pathMatch: 'full' },
  { path: '**', redirectTo: 'ejercicios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
