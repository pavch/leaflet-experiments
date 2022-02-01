import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Marker, marker, LatLng, LeafletMouseEvent, TileLayer, Polygon, Circle } from 'leaflet';
import { WMSService } from '../services/WMSService';

type OverlayUnion = Polygon | Circle;

interface LayerControl {
  baseLayers: Record<string, TileLayer>;
  overlays: Record<string, OverlayUnion>
}

interface WMSLayer {
  name: string;
  id: string;
  server: string;
} 

@Component({
  selector: 'app-map',
  providers: [WMSService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public options: any;
  public layersControl!: LayerControl;
  public currentPositionMarker!: Marker<any>;
  public latCoord = 42.698334;
  public longCoord = 23.319941;
  public center!: LatLng;
  private baseLayers: Record<string, TileLayer> = {
    'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18 })
  };

  constructor(
    private wmsService: WMSService
  ) {}

  populateLayers() {
    this.wmsService.getWMSLayerByName('columbia').subscribe((res: any) => {
      res.layers.forEach((layer: any) => {
        this.baseLayers[layer.name] = tileLayer.wms(res.geoserverURL, {
          layers: layer.id
        })
      })
    })

  }

  ngOnInit() {
    
    this.center = latLng(this.latCoord, this.longCoord);

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
      ],
      zoom: 12,
      center: this.center
    };

    this.populateLayers();
    console.log(this.baseLayers);
    this.layersControl = {

      baseLayers: this.baseLayers,
      overlays: {
        'Circle': circle([this.latCoord, this.longCoord], { radius: 5000 }),
        'Square': polygon([[42.698334, 23.319941], [42.698334, 23.319941]])
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
    this.center = latLng(parseFloat(event.latlng.lat.toFixed(6)),  parseFloat(event.latlng.lng.toFixed(6)));
    this.currentPositionMarker = marker([this.latCoord, this.longCoord]);
  }


}