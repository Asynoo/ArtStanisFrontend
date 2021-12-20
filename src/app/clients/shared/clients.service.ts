import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ClientDto} from "./client.dto";
import {CountryDto} from "./country.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private _http: HttpClient){

  }


  getAll(count: number, page: number): Observable<ClientDto[]>{
    return this._http.get<ClientDto[]>(environment.api + `/api/Client?Count=${count}&Page=${page}`);
  }

  get(id: number): Observable<ClientDto> {
    return this._http.get<ClientDto>(environment.api + `/api/Client/${id}`);
  }

  delete(id: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.api + `/api/Client/${id}`);
  }

  create(client: ClientDto): Observable<ClientDto> {
    console.log(client)
    return this._http.post<ClientDto>(environment.api + `/api/Client`, client);
  }

  edit(client: ClientDto): Observable<ClientDto> {
    return this._http.put<ClientDto>(environment.api + `/api/Client`, client);
  }
}
