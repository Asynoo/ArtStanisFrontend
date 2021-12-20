import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ClientDto} from "../clients/shared/client.dto";
import {ClientsService} from "../clients/shared/clients.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  clients$: Observable<ClientDto[]> | undefined;
  update$: Subject<any> = new Subject();

// Update function
  updateChart(){
    this.update$.next(true);
  }

  constructor(private _clientsService: ClientsService) { }

  data: [{name: string, value: number}] = [{name: 'Countries', value: 0}];

  ngOnInit(): void {
    this.clients$ = this._clientsService.getAll(50, 1);

    this.clients$.forEach(x => {
      x.forEach((y, index) => {
        if (!this.data.some(x => x.name === y.address.country.countryName)) {
          this.data.push({name: y.address.country.countryName, value: 1})
        } else {
          this.data[index].value = this.data[index].value + 1
        }
        this.data = [...this.data]
      })
    })
  }
}
