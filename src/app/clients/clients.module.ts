import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailComponent,
    ClientEditComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ClientsModule { }
