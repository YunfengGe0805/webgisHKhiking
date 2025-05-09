// Listen for the Generate Viewpoint by Name button click event
document.getElementById('generateviewNameBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected viewpoint name
        const viewName = document.getElementById('viewName').value;

        // Construct the request data
        const requestData = {
            viewName
        };

        // Send a request to the backend API
        const response = await fetch('./getviewbyname.php', {
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

        // Clear the old viewpoint layer if it exists
        if (window.currentViewLayer) {
            map.removeLayer(window.currentViewLayer);
        }

        // Validate the GeoJSON data
        if (!data.viewGeoJSON || data.viewGeoJSON.features.length === 0) {
            alert('No viewpoint data found for the selected name.');
            return;
        }

        // // Add the new viewpoint to the map
        // window.currentViewLayer = L.geoJSON(data.viewGeoJSON, {
        //     style: { color: 'yellow', weight: 4 }
        // }).addTo(map);
        window.currentViewLayer = L.geoJSON(data.viewGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Viewpoint Name:</strong> ${feature.properties.viewname || 'N/A'}<br>
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
        // Fit the map to the viewpoint bounds
        const bounds = window.currentViewLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid viewpoint data. Unable to display the site.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load viewpoint: ${error.message}`);
    }
});

// Listen for the Generate Viewpoint by Wild Pig Risk button click event
document.getElementById('generateViewBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected wild pig encounter risk
        const wildlifeRisk = document.getElementById('viepigList').value;

        // Construct the request data
        const requestData = {
            wildlifeRisk
        };

        // Send a request to the backend API
        const response = await fetch('./getview.php', {
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

        // Clear the old viewpoint layer if it exists
        if (window.currentViewLayer) {
            map.removeLayer(window.currentViewLayer);
        }

        // // Add the new viewpoints to the map
        // window.currentViewLayer = L.geoJSON(data.viewGeoJSON, {
        //     style: { color: 'yellow', weight: 4 }
        // }).addTo(map);
        window.currentViewLayer = L.geoJSON(data.viewGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Viewpoint Name:</strong> ${feature.properties.viewname || 'N/A'}<br>
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
        
        // Fit the map to the viewpoints' bounds
        map.fitBounds(window.currentViewLayer.getBounds());
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load viewpoints: ${error.message}`);
    }
});