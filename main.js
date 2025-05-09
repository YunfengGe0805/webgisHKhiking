document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map and set it to show the whole Hong Kong region
    window.initialCoordinates = [22.349876, 114.143493];
    window.initialZoom = 11;

    // Assign the map to the global `window` object
    window.map = L.map('map', {
        center: initialCoordinates,
        zoom: initialZoom,
        zoomControl: false // Disable the default zoom control
    });

    // Base map layer
    window.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(window.map);

    // Add the zoom control to the top-right corner
    L.control.zoom({
        position: 'topright' // Move zoom control to the top-right
    }).addTo(window.map);

    const wildpig = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:wildpig',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });

    const attraction = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:attraction',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });

    const bbqsite = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:barbequesite',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });

    const campsite = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:campsite',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });

    const viewpoint = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:viewingpoint',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });

    const hike = L.tileLayer.wms('http://localhost:8080/geoserver/finalproject/wms', {
        layers: 'hikingDB:hikingroute',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
    });
    
    // Add layer control
    const overlayMaps = {
        "Wild Pig Layer": wildpig,
        "Attraction Layer": attraction,
        "BBQ Site Layer": bbqsite,
        "Campsite Layer": campsite,
        "Viewing Point Layer": viewpoint,
        "Hiking Route Layer": hike
    };
    
    L.control.layers(null, overlayMaps, { position: 'topright' }).addTo(window.map);
});



