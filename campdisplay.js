// Listen for the Generate Campsite by Name button click event
document.getElementById('generatecampNameBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected campsite name
        const campName = document.getElementById('campName').value;

        // Construct the request data
        const requestData = {
            campName
        };

        // Send a request to the backend API
        const response = await fetch('./getcampbyname.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }

        // Clear the old campsite layer if it exists
        if (window.currentCampLayer) {
            map.removeLayer(window.currentCampLayer);
        }

        // Validate the GeoJSON data
        if (!data.campGeoJSON || data.campGeoJSON.features.length === 0) {
            alert('No campsite data found for the selected name.');
            return;
        }

        // // Add the new campsite to the map
        // window.currentCampLayer = L.geoJSON(data.campGeoJSON, {
        //     style: { color: 'purple', weight: 4 }
        // }).addTo(map);
        window.currentCampLayer = L.geoJSON(data.campGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Campsite Name:</strong> ${feature.properties.attname || 'N/A'}<br>
                        <strong>Water Source:</strong> ${feature.properties.water || 'N/A'}<br>
                        <strong>Tent Space:</strong> ${feature.properties.tent || 'N/A'}<br>
                        <strong>Wild Pig Risk:</strong> ${feature.properties.pigrisk || 'N/A'}
                    `;

                    // Bind a popup to the feature
                    layer.bindPopup(popupContent);

                    // Add mouseover and mouseout events for hover effect
                    layer.on('mouseover', (e) => {
                        layer.openPopup(); // Open the popup on hover
                    });

                    layer.on('mouseout', (e) => {
                        layer.closePopup(); // Close the popup when the mouse leaves
                    });
                }
            }
        }).addTo(map);
        // Fit the map to the campsite bounds
        const bounds = window.currentCampLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid campsite data. Unable to display the site.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load campsite: ${error.message}`);
    }
});

// Listen for the Generate Campsite by Filters button click event
document.getElementById('generatecampBtn').addEventListener('click', async () => {
    try {
        // Get user-selected options
        const waterSource = document.getElementById('waterList').value;
        const tentSpace = document.getElementById('tentList').value;
        const wildlifeRisk = document.getElementById('campigList').value;

        // Construct the request data
        const requestData = {
            waterSource,
            tentSpace,
            wildlifeRisk
        };

        // Send a request to the backend API
        const response = await fetch('./getcamp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }

        // Clear the old campsite layer if it exists
        if (window.currentCampLayer) {
            map.removeLayer(window.currentCampLayer);
        }

        // // Add the new campsites to the map
        // window.currentCampLayer = L.geoJSON(data.campGeoJSON, {
        //     style: { color: 'purple', weight: 4 }
        // }).addTo(map);
        window.currentCampLayer = L.geoJSON(data.campGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Campsite Name:</strong> ${feature.properties.attname || 'N/A'}<br>
                        <strong>Water Source:</strong> ${feature.properties.water || 'N/A'}<br>
                        <strong>Tent Space:</strong> ${feature.properties.tent || 'N/A'}<br>
                        <strong>Wild Pig Risk:</strong> ${feature.properties.pigrisk || 'N/A'}
                    `;

                    // Bind a popup to the feature
                    layer.bindPopup(popupContent);

                    // Add mouseover and mouseout events for hover effect
                    layer.on('mouseover', (e) => {
                        layer.openPopup(); // Open the popup on hover
                    });

                    layer.on('mouseout', (e) => {
                        layer.closePopup(); // Close the popup when the mouse leaves
                    });
                }
            }
        }).addTo(map);
        
        // Fit the map to the campsites' bounds
        map.fitBounds(window.currentCampLayer.getBounds());
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load campsites: ${error.message}`);
    }
});