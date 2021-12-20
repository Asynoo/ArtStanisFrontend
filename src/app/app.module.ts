import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import {GoogleMapsModule} from "@angular/google-maps";
import {MapsComponent} from "./maps/maps.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChartsComponent } from './charts/charts.component';
import {PieChartModule} from "@swimlane/ngx-charts";
import { CountryComponent } from './country/country.component';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    ChartsComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    PieChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
