const express = require('express');
const app = express();
const cors = require("cors");
const port = 1234;

let layersData = [
    {
        geoserverURL: "http://sedac.ciesin.columbia.edu/geoserver/wms",
        geoserverName: "columbia",
        layers: [
            {
                id: "lulc:lulc-global-grid-prob-urban-expansion-2030",
                name: "Population Dencity"
            },
            {
                id: "gpw-v4:gpw-v4-population-density_2015",
                name: "Probabilities of Urban Expansion"
            }
        ]
    },
    {
        geoserverURL: "http://ows.mundialis.de/services/service?",
        geoserverName: "mundialis",
        layers: [
            {
                id: "TOPO-OSM-WMS",
                name: "Terrain"
            }
        ]
    }
];


app.use(cors())

app.get('/getWMSLayers', (req, res) => {
    res.json(layersData);
})

// expects query name 'server' - should contain the already defined WMS server name
app.get('/getWMSLayer', (req, res) => {
    if (req.query && req.query.server) {
        let layersDataByName = layersData.filter(e => e["geoserverName"] === req.query.server)[0];
        res.json(layersDataByName);
    } else {
        res.send({ "error": "Missing query parameter!" });
    }
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});