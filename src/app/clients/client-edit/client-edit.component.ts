import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientsService} from "../shared/clients.service";
import {ClientDto} from "../shared/client.dto";
import {Location} from '@angular/common'

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  client: ClientDto = {id: 0, name: '', address: {id: 0, city: 'BinLadenBjerg', country: {id: 1, countryName: 'Afghanistan', countryCode: 'AF'}, houseNumber: 0, postalCode: 0, street: ''}, applyDate: new Date(), notes: '', priority: 0 };

  constructor(private _clientsService: ClientsService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id)
      this._clientsService.get(id).subscribe(client => this.client = client);
  }

  saveClient() {
    if (!this.client.id){
      this._clientsService.create(this.client).subscribe(client => console.log('Client Successfully Created'));
      this.goBack();
    }
    else {
      this._clientsService.edit(this.client.id, this.client).subscribe(client => console.log('Client Successfully Updated'))
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
