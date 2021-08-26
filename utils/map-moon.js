const mapId = "map";
const initialCoordinates = [20, 0];
const map = L.map(mapId, {
    maxZoom: 12,
    minZoom: 2,
    zoomControl: false
}).setView(initialCoordinates, 2);

const baselayer = new L.tileLayer(`https://api.mapbox.com/styles/v1/celesmaps/ck3zqygwd1crq1dpjr5zsg850/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2VsZXNtYXBzIiwiYSI6ImNrMWw4cXVkejAyeW8zbHBjcG5ndm56dnMifQ.Lo-HcutWrEn0lpfMrfoGEA`, {
    attribution: '<a href="https://www.nasa.gov/">Nasa</a>',
    zoom: 2,
    tms: false,
}).addTo(map).setZIndex(0);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


const LeafIcon = L.Icon.extend({
    options: {
        iconSize: [40, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});

let apollo11Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo11.png'
});

const apollo11Cords = [0.67416, 23.47314];

L.marker(apollo11Cords, {
        icon: apollo11Icon
    })
    .bindPopup('<b>Apollo 11</b><br><b>Landing date</b> 20 Jul 1969<br><b>Landing site</b> Mare Tranquilitatis')
    .addTo(map);

let apollo12Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo12.png'
});

const apollo12Cords = [-3.0128, -23.4219];

L.marker(apollo12Cords, {
        icon: apollo12Icon
    })
    .bindPopup('<b>Apollo 12</b><br><b>Landing date</b> 19 Nov 1969<br><b>Landing site</b> Oceanus Procellarum')
    .addTo(map);

let apollo14Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo14.png'
});

const apollo14Cords = [-3.64589, -17.47194];

L.marker(apollo14Cords, {
        icon: apollo14Icon
    })
    .bindPopup('<b>Apollo 14</b><br><b>Landing date</b> 5 Feb 1971<br><b>Landing site</b> Fra Mauro')
    .addTo(map);

let apollo15Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo15.png'
});

const apollo15Cords = [26.13239, 3.63330];

L.marker(apollo15Cords, {
        icon: apollo15Icon
    })
    .bindPopup('<b>Apollo 15</b><br><b>Landing date</b> 30 Jul 1971<br><b>Landing site</b> Hadley Rille')
    .addTo(map);

let apollo16Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo16.png'
});

const apollo16Cords = [-8.9734, 15.5011];

L.marker(apollo16Cords, {
        icon: apollo16Icon
    })
    .bindPopup('<b>Apollo 16</b><br><b>Landing date</b> 20 Apr 1972<br><b>Landing site</b> Descartes')
    .addTo(map);

let apollo17Icon = new LeafIcon({
    iconUrl: '/public/assets/apollo17.png'
});

const apollo17Cords = [20.1911, 30.7723];

L.marker(apollo17Cords, {
        icon: apollo17Icon
    })
    .bindPopup('<b>Apollo 17</b><br><b>Landing date</b> 11 Dec 1972<br><b>Landing site</b> Taurus-Littrow')
    .addTo(map);