import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Marker, marker, LatLng, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options: any;
  layersControl: any;
  currentPositionMarker: Marker<any>;
  latCoord = 42.698334;
  longCoord = 23.319941;
  center: any;
  ngOnInit() {
    
  }
  constructor() {
    this.center = latLng(this.latCoord, this.longCoord);

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 12,
      center: this.center
    };
  
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: {
        'Big Circle': circle([this.latCoord, this.longCoord], { radius: 5000 }),
        'Big Square': polygon([[42.698334, 23.319941], [42.698334, 23.319941]])
      }
    };
    this.currentPositionMarker = marker([this.latCoord, this.longCoord]);
  }

  onLatChanged(lat: number) {
    this.center = latLng(lat, this.longCoord);
  }

  onLongChanged(long: number) {
    this.center = latLng(this.latCoord, long);
  }
  
  onMapClick(event: LeafletMouseEvent) {
    this.latCoord = parseFloat(event.latlng.lat.toFixed(6));
    this.longCoord = parseFloat(event.latlng.lng.toFixed(6));
  }


}