import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {Observable} from "rxjs";
import {ClientDto} from "../clients/shared/client.dto";
import {ClientsService} from "../clients/shared/clients.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  clients$: Observable<ClientDto[]> | undefined;

  constructor(private _clientsService: ClientsService) { }
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap | undefined

  zoom = 5  // @ts-ignore
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
  address: string[] = []
  infoContent = ''

  ngOnInit() {
    this.clients$ = this._clientsService.getAll(50, 1);

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.clients$.forEach(x => {
      x.forEach(y => this.getAddress(y.address.street + " " + y.address.houseNumber + " " + y.address.postalCode))
    })
  }

  zoomIn() {
    if (this.options.maxZoom) {
      if (this.zoom < this.options.maxZoom) this.zoom++
    }
  }

  zoomOut() {
    if (this.options.minZoom)
      if (this.zoom > this.options.minZoom) this.zoom--
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
        })
      });
    });
  };
}
