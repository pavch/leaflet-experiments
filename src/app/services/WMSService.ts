import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WMSService {
    private serverURL = "http://localhost:1234";

    constructor(private http: HttpClient) { }

    public getWMSLayerByName(name: String) {
        return this.http.get(`${this.serverURL}/getWMSLayer?server=${name}`)
    }

    public getWMSLayers() {
        return this.http.get(`${this.serverURL}/getWMSLayers`)
    }
}