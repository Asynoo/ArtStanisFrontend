import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../shared/clients.service';

import {Observable} from 'rxjs';

import {ClientDto} from "../shared/client.dto";
import {Location} from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<ClientDto[]> | undefined;
  page: number = 1;

  constructor(private _clientsService: ClientsService, private location: Location) { }

  ngOnInit(): void {
    this._clientsService.getAll(50, this.page).subscribe(x => this.clients$ = of(x));
  }

  getNextPage() {
    this.page = this.page + 1
    this.clients$ = this._clientsService.getAll(50, this.page);
  }

  getPreviousPage() {
    this.page = this.page - 1
    this.clients$ = this._clientsService.getAll(50, this.page);
  }

  goBack() {
    this.location.back()
  }
}
