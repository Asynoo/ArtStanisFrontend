import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {CountryDto} from "../../clients/shared/country.dto";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private _http: HttpClient){

  }

  getAllCountries(): Observable<CountryDto[]>{
    return this._http.get<CountryDto[]>(environment.api + '/api/country');
  }
}
