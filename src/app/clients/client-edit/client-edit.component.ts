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
  @Input() client: ClientDto = {id: 0, name: '', address: '', applyDate: '', country: '', notes: '', priority: 0 };

  constructor(private _clientsService: ClientsService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id)
      this._clientsService.get(id).subscribe(client => this.client = client);
  }

  saveClient(client: ClientDto) {
    if (!client.id){
      this._clientsService.create(client).subscribe(client => console.log('WE CREATED STUFF'));
      this.goBack();
    }
    else {
      this._clientsService.edit(client.id, client).subscribe(client => console.log('WE UPDAETD STUFF'))
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
