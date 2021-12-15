import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ClientDto} from "./client.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private _http: HttpClient){

  }


  getAll(): Observable<ClientDto[]> {
    return this._http.get<ClientDto[]>(environment.api + '/api/Client');
  }

  get(id: number): Observable<ClientDto> {
    return this._http.get<ClientDto>(environment.api + `/api/Client/${id}`);
  }

  delete(id: number): Observable<boolean> {
    return this._http.delete<boolean>(environment.api + `/api/Client/${id}`);
  }

  create(client: ClientDto): Observable<ClientDto> {
    return this._http.post<ClientDto>(environment.api + `/api/Client`, client);
  }

  edit(id: number, client: ClientDto): Observable<ClientDto> {
    return this._http.put<ClientDto>(environment.api + `/api/Client/${id}`, client);
  }
}