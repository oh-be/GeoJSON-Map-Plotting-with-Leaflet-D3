// URLs
var earthquakeurl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
var tectonicplatesurl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'


d3.json(earthquakeurl).then(function(earthquakeData){
    createFeatures(earthquakeData.features);
});

function createFeatures(earthquakeData) {
    // circle / marker size
    function markerSize(magnitude) {
        switch (true) {
        case magnitude > 5.23875:
            return 25;
        case magnitude > 4.2775:
            return 20;
        case magnitude > 2.355:
            return 15;
        case magnitude > 0.4325:
            return 10;
        case magnitude > -1.49:
            return 5;
        }
    }
    function markerDepth(depth) {
        switch (true) {
        case depth > 100:
            return 1;
        case depth > 60:
            return .8;
        case depth > 30:
            return .7;
        case depth > 10:
            return .6;
        case depth > 0:
            return .5;
        }
    }
    // marker attributes
    function styleInfo(feature) {
        return {
            opacity: 0.6,
            fillOpacity: markerDepth(feature.geometry.coordinates[2]),
            fillColor: chooseColor(feature.properties.mag),
            color: "black",
            radius: markerSize(feature.properties.mag),
            stroke: true,
            weight: 1
        };
    }
    // Function to Determine Color of Marker Based on the Magnitude of the Earthquake
    function chooseColor(magnitude) {
        switch (true) {
        case magnitude > 5.23875:
            return "hsl(0, 81%, 42%)";
        case magnitude > 4.2775:
            return "hsl(15, 63%, 51%)";
        case magnitude > 2.355:
            return "hsl(37, 86%, 45%)";
        case magnitude > 0.4325:
            return "hsl(90, 88%, 47%)";
        case magnitude > -1.49:
            return "hsl(98, 50%, 53%)";
        }
    }
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h1>${feature.properties.mag} Magnitude</h1><hr><h3>${feature.properties.place}<br>Elevation: ${feature.geometry.coordinates[2]} ft. above Sea Level</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}

// d3.json(tectonicplatesurl, function (data) {
//     createFeatures(data.features);
// });

// function createFeatures(plateData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.LAYER}</h3><hr><p>${new Date(feature.properties.Name)}</p>`);
//     }
//     var plates = L.geoJSON(plateData, {
//         onEachFeature: onEachFeature,
//         color: "white",
//         weight: 2
//     });
//     createMap(plates);
// }

function createMap(earthquakes, plates) {
    
    var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
    });

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    })

    var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object.
    var baseMaps = {
        "Satellite": street,
        "Topographic": topo,
        "Grayscale": grayscale,
    };

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
        Earthquakes: earthquakes,
        // Plates: plates
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            30.446,12.282
        ],
        zoom: 3.4,
        layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}
