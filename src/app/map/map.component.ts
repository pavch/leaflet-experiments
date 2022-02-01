import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Circle } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options: any;
  layersControl: any;
  homeCircleLayer: Circle<any>;

  homeCircleShown = true;

  ngOnInit() {
    
  }
  constructor() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 12,
      center: latLng(42.698334, 23.319941)
    };
  
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: {
        'Big Circle': circle([42.698334, 23.319941], { radius: 5000 }),
        'Big Square': polygon([[42.698334, 23.319941], [42.698334, 23.319941]])
      }
    };
    this.homeCircleLayer = circle([43.56667, 27.83333], { radius: 5000 });
  }
}