const mapId = "map";
const initialCoordinates = [0, 0];
const map = L.map(mapId, {
    maxZoom: 7,
    minZoom: 2,
    zoomControl: false
}).setView(initialCoordinates, 3);

const baselayer = new L.tileLayer('http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/viking_mdim21_global/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openplanetary.org/">OpenPlanetary</a>',
    zoom: 3,
    tms: true,
}).addTo(map).setZIndex(0);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


let LeafIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});



const perseverance = L.realtime({
    url: 'https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints_current.json',
    crossOrigin: true,
    type: 'json'
}, {
    interval: 300 * 1000,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
                'icon': L.icon({
                    iconUrl: '/public/assets/rover.png',
                    iconSize: [50, 50]
                })
            })
            .bindPopup(`<b>Perseverance</b><br><b>Mission</b> ${data.msv.mission}<br><b>Location</b> ${data.tools[1].variables.sites[0].name}<br><b>Position</b> ${data.tools[1].variables.sites[0].view}<br><b>Daily Max. Temperature</b> ${weather.max_temp}°C<br><b>Daily Min. Temperature</b> ${weather.min_temp}°C`)
    }
}).addTo(map);

perseverance.on('update', function () {
    map.fitBounds(perseverance.getBounds(), {
        maxZoom: 2
    });
});