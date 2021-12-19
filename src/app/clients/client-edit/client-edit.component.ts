import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../shared/clients.service";
import {ClientDto} from "../shared/client.dto";
import {Location} from '@angular/common'
import {CountryService} from "../../country/shared/countries.service";
import {CountryDto} from "../shared/country.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  client: ClientDto = {id: 0, name: '',email: '',  address: {id: 0, city: '', country: {id: 0, countryName: '', countryCode: ''}, houseNumber: 0, postalCode: 0, street: ''}, applyDate: new Date(), notes: '', priority: 0 };
  countries: CountryDto[] = [];
  clientForm: FormGroup;

  constructor(private _clientsService: ClientsService,
              private route: ActivatedRoute,
              private router: Router,
              private _countryService: CountryService) {

    this.clientForm = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ),
      email: new FormControl(
        '',
        Validators.required
      ),
      street: new FormControl(),
      houseNumber: new FormControl(),
      postalCode: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      priority: new FormControl(),
      notes: new FormControl(),
    })}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id)
      this._clientsService.get(id).subscribe(client => this.client = client);

    this._countryService.getAllCountries().subscribe(countries => this.countries = countries);
  }

  saveClient() {
    if (!this.client.id){
      this._clientsService.create(this.client).subscribe(client => {
        this.client = client
        this.goBack();
      });

    }
    else {
      this._clientsService.edit(this.client).subscribe(client => {
        this.client = client
        this.goBack();
      })
    }
  }

  equals(o1: CountryDto, o2: CountryDto) {
    return o1.id === o2.id;
  }

  goBack() {
    this.router.navigateByUrl('/clients');
  }
}
