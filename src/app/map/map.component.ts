import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Marker, marker, LatLng, LeafletMouseEvent, TileLayer, Polygon, Circle, icon } from 'leaflet';
import { map } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
  ) { }


  ngOnInit() {

    this.center = latLng(this.latCoord, this.longCoord);

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
      ],
      zoom: 12,
      center: this.center
    };

    this.populateLayers().pipe(take(1)).subscribe((layers) => {
      this.layersControl = {
        baseLayers: {...this.baseLayers, ...layers },
        overlays: {
          'Circle': circle([this.latCoord, this.longCoord], { radius: 5000 }),
          'Square': polygon([[42.69581, 23.306808], [42.69581, 23.338737], [42.726587, 23.338737], [42.726587, 23.306808]])
        }
      };
      this.currentPositionMarker = marker([this.latCoord, this.longCoord]);
    });

  }

  private populateLayers() {
    return this.wmsService.getWMSLayerByName('columbia').pipe(map((res: any) => {
      const baseLayers: Record<string, TileLayer.WMS> = {};
      for (const layer of res.layers) {
        baseLayers[layer.name] = tileLayer.wms(res.geoserverURL, {
          layers: layer.id
        })
      }
      return baseLayers
    }))
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
    this.center = latLng(parseFloat(event.latlng.lat.toFixed(6)), parseFloat(event.latlng.lng.toFixed(6)));
    this.currentPositionMarker = marker([this.latCoord, this.longCoord], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }


}