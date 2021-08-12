mapboxgl.accessToken = 'pk.eyJ1IjoibWFoaXJhZGF5YWwiLCJhIjoiY2tzOHgxOHIyMDJzcTJubnltdWZncHBscyJ9.fcmvZQvKzqzDUa__SSUOeA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mahiradayal/cks8wvhzh0btf19qtbsk2vpoy',
    zoom: 10,
    center: [-93.722030, 32.461914]
});

map.on('load', function () {
    map.addLayer({
        'id': 'caddoData',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/data/caddo_bank_coords.geojson'
        },
        'paint': {
            'circle-color': '#ff7f50',
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-radius': 5
        }
    });
});