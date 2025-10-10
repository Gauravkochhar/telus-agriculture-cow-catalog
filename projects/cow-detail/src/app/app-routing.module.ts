import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowDetailsComponent } from './components/cow-details/cow-details.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: CowDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
