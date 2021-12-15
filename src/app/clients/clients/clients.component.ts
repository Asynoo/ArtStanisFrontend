import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../shared/clients.service';
import {Observable} from 'rxjs';
import {ClientDto} from "../shared/client.dto";
import {Location} from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<ClientDto[]> | undefined;

  constructor(private _clientsService: ClientsService, private location: Location) { }

  ngOnInit(): void {
    this.clients$ = this._clientsService.getAll();
  }

  goBack() {
    this.location.back()
  }
}