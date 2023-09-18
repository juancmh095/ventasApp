import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';

export interface Feature {
  place_name: string;
}

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapbox:any = (mapboxgl as typeof mapboxgl);
  mapa:any;
  style:any = `mapbox://styles/mapbox/streets-v11`;

  constructor(private http: HttpClient) {
    this.mapbox.accessToken = environment.mapbox.accessToken;
  }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=address&access_token='
    + environment.mapbox.accessToken)
    .pipe(map((res: any) => {
      return res.features;
    }));
  }

  buildMap(lat:any,lng:any) {
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [lng,lat]
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    this.mapa.addControl(new mapboxgl.NavigationControl());
  }

}
