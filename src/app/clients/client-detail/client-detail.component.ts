import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientDto} from "../shared/client.dto";
import {ClientsService} from "../shared/clients.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: ClientDto = {id: 0, name: '', address: '', applyDate: '', country: '', notes: '', priority: 0 };

  constructor(private _productsService: ClientsService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this._productsService.get(id).subscribe(client => this.client = client);
  }

  deleteClient(id: number) {
    this._productsService.delete(id).subscribe(client => console.log(client));
    this.location.back();
  }
}
