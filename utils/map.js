navigator.geolocation.watchPosition((position) => {

    const mapId = "map";
    const initialCoordinates = [position.coords.latitude, position.coords.longitude];
    const map = L.map(mapId, { maxZoom: 20, minZoom: 2, zoomControl: false }).setView(initialCoordinates, 5);

    const MAPBOX_API =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
    const ATTRIBUTION =
        '© <a href="https://www.mapbox.com/">Mapbox</a>';

    const ACCESS_TOKEN =
        "pk.eyJ1IjoibW1hcnRpbmRqIiwiYSI6ImNrcjYxYnBnMzAxbXkydnBnemJ0eDBtZ2wifQ.JvTICi-_V8Uo5vgqyCjvfg";
    L.tileLayer(MAPBOX_API, {
        attribution: ATTRIBUTION,
        maxZoom: 22,
        id: "mapbox/dark-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ACCESS_TOKEN,
    }).addTo(map);

    L.marker(initialCoordinates)
        .bindPopup("<b>You are here!</b>")
        .addTo(map);
    
    let LeafIcon = L.Icon.extend({
      options: {
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
      }
    });

    let landingIcon = new LeafIcon({
                iconUrl: '/public/assets/landing_icon.png'
    });
    let landingsLayer = L.layerGroup().addTo(map);
    for (let landing of data) {
    const landingCords = [parseFloat(landing.reclat), parseFloat(landing.reclong)];
    L.marker(landingCords, {
        icon: landingIcon
        })
        .bindPopup(`<b>${landing.name === undefined ? 'no data' :landing.name}</b><br>Mass: ${landing.mass === undefined ? 'no data' : landing.mass} gr<br>Year: ${landing.year === undefined ? 'no data' : landing.year}<br>Class: ${landing.recclass === undefined ? 'no data' : landing.recclass}`)
        .addTo(landingsLayer);
    };
    L.control.zoom({
    position: 'bottomright'
    }).addTo(map);

    });

    let btn_min_mass = document.querySelector("#btn_min_mass");
    let btn_mass = document.querySelector("#btn_mass");
    let btn_class = document.querySelector("#btn_class");
    let btn_years = document.querySelector("#btn_years");

    let input_min_mass = document.querySelector("#input_min_mass");
    let input_mass = document.querySelector("#input_mass");
    let input_class = document.querySelector("#input_class");
    let input_from = document.querySelector("#input_from");
    let input_to = document.querySelector("#input_to");

    btn_min_mass.disabled = true;
    btn_mass.disabled = true;
    btn_class.disabled = true;
    btn_years.disabled = true;


    input_min_mass.addEventListener('input', () => {
        let min_mass_value = input_min_mass.value;
        let regex = /^[0-9]{1,15}$/g
        min_mass_value.match(regex) ? btn_min_mass.disabled = false:
                                      btn_min_mass.disabled = true;
    })
    input_mass.addEventListener('input', () => {
        let mass_value = input_mass.value;
        let regex = /^[0-9]{1,15}$/g
        mass_value.match(regex)?    btn_mass.disabled = false:
                                    btn_mass.disabled = true;
    })
    let landings_recclass = [];
    for(let landing of data){
    if(landings_recclass.indexOf(landing.recclass) === -1) {
        landings_recclass.push(landing.recclass);
        }
    }
    input_class.addEventListener('input', () => {
        let class_value = input_class.value;
        landings_recclass.includes(class_value) ?   btn_class.disabled = false:
                                                    btn_class.disabled = true;
    })

    
    input_from.addEventListener('input', () => {
        let from_value = input_from.value;
        let regex = /^[0-9]{1,4}$/g
        from_value.match(regex)?    btn_years.disabled = false:
                                    btn_years.disabled = true;
    })
    input_to.addEventListener('input', () => {
        let to_value = input_to.value;
        let regex = /^[0-9]{1,4}$/g
        to_value.match(regex)?    btn_years.disabled = false:
                                    btn_years.disabled = true;
    })

