import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.catalogUrl,
        exposedModule: './Module'
      }).then(m => m.AppModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.detailUrl,
        exposedModule: './Module'
      }).then(m => m.AppModule),
  },
  { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
