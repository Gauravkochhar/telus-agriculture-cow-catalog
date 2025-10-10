import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowCardComponent } from './components/cow-card/cow-card.component';
import { CowListComponent } from './components/cow-list/cow-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listing',
    pathMatch: 'full',
  },
  {
    path: 'listing',
    component: CowListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CowCardComponent,
    CowListComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
