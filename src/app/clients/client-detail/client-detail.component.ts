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
  client: ClientDto = {id: 0, name: '',email: '', address: {id: 0, city: '', country: {id: 0, countryName: '', countryCode: ''}, houseNumber: 0, postalCode: 0, street: ''}, applyDate: new Date(), notes: '', priority: 0 };
  zoom = 12  // @ts-ignore
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    mapTypeId: 'hybrid',
    maxZoom: 150,
    minZoom: 1,
  }
  markers: any[] = []

  constructor(private _productsService: ClientsService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this._productsService.get(id).subscribe(client => {
      this.client = client
      this.getAddress(this.client.address.street + " " + this.client.address.houseNumber + " " + this.client.address.postalCode)
    });

  }

  deleteClient(id: number) {
    this._productsService.delete(id).subscribe(client => console.log(client));
    this.location.back();
  }

  getAddress = (address: string) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, (results, status) => {
        if (status === 'OK') {
          if (results) {
            resolve(results[0].geometry.location);
          }
        } else {
          reject(status);
        }
        // @ts-ignore
      }).then(location => {
        location.results.forEach((x: { geometry: { location: { lat: () => any; lng: () => any; }; }; }) => {
          this.markers.push({
            position: {
              lat: x.geometry.location.lat(),
              lng: x.geometry.location.lng()
            }
          })
          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: x.geometry.location.lat(),
              lng: x.geometry.location.lng(),
            }
          })
        })
      });
    });
  };
}
