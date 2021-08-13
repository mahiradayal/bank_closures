mapboxgl.accessToken = 'pk.eyJ1IjoibWFoaXJhZGF5YWwiLCJhIjoiY2tzOHgxOHIyMDJzcTJubnltdWZncHBscyJ9.fcmvZQvKzqzDUa__SSUOeA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mahiradayal/cks8wvhzh0btf19qtbsk2vpoy',
    zoom: 11,
    center: [-115.571433, 32.792827]
});

map.on('load', function () {
    map.addLayer({
        'id': 'turnstileData',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/imperial_bank_coord.geojson'
        },
        'paint': {
            'circle-color': '#14521D',
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.4,
            'circle-radius': ['interpolate', ['linear'], ['get', 'ASSET'],
                -1, 10,
                -0.4, 1,
            ]
        }
    });
});

map.on('click', 'turnstileData', function (e) {
    var assets = e.features[0].properties.ASSET;
    var name = e.features[0].properties.NAMEFULL;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("Asset Holding Size: $" + assets + '<br>' + "Bank Name: " + name)
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'turnstileData', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'turnstileData', function () {
    map.getCanvas().style.cursor = '';
});