import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class WMSService {

    constructor(private http: HttpClient) { }

    public getWMSLayerByName(name: String) {
        return this.http.get(`${environment.backendURL}/getWMSLayer?server=${name}`)
    }

    public getWMSLayers() {
        return this.http.get(`${environment.backendURL}/getWMSLayers`)
    }
}