import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientDetailComponent} from "./clients/client-detail/client-detail.component";
import {ClientEditComponent} from "./clients/client-edit/client-edit.component";
import {MapsComponent} from "./maps/maps.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module')
      .then(m => m.ClientsModule)
  },
  {
    path: 'detail/:id', component: ClientDetailComponent
  },
  {
    path: 'edit/:id', component: ClientEditComponent
  },
  {
    path: 'edit', component: ClientEditComponent
  },
  {
    path: 'map', component: MapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
