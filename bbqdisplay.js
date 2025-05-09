// Listen for the Generate BBQ Site by Name button click event
document.getElementById('generatebbqNameBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected BBQ site name
        const bbqName = document.getElementById('bbqName').value;

        // Construct the request data
        const requestData = {
            bbqName
        };

        // Send a request to the backend API
        const response = await fetch('./getbbqbyname.php', {
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

        // Clear the old BBQ site layer if it exists
        if (window.currentBBQLayer) {
            map.removeLayer(window.currentBBQLayer);
        }

        // Validate the GeoJSON data
        if (!data.bbqGeoJSON || data.bbqGeoJSON.features.length === 0) {
            alert('No BBQ site data found for the selected name.');
            return;
        }

        // // Add the new BBQ site to the map
        // window.currentBBQLayer = L.geoJSON(data.bbqGeoJSON, {
        //     style: { color: 'orange', weight: 4 }
        // }).addTo(map);
        window.currentBBQLayer = L.geoJSON(data.bbqGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>BBQ Site Name:</strong> ${feature.properties.bbqname || 'N/A'}<br>
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
        // Fit the map to the BBQ site's bounds
        const bounds = window.currentBBQLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid BBQ site data. Unable to display the site.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load BBQ site: ${error.message}`);
    }
});

// Listen for the Generate BBQ Site by Wild Pig Risk button click event
document.getElementById('generatebbqBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected wild pig encounter risk
        const wildlifeRisk = document.getElementById('bbqpigList').value;

        // Construct the request data
        const requestData = {
            wildlifeRisk
        };

        // Send a request to the backend API
        const response = await fetch('./getbbq.php', {
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

        // Clear the old BBQ site layer if it exists
        if (window.currentBBQLayer) {
            map.removeLayer(window.currentBBQLayer);
        }

        // // Add the new BBQ sites to the map
        // window.currentBBQLayer = L.geoJSON(data.bbqGeoJSON, {
        //     style: { color: 'orange', weight: 4 }
        // }).addTo(map);
        window.currentBBQLayer = L.geoJSON(data.bbqGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>BBQ Site Name:</strong> ${feature.properties.bbqname || 'N/A'}<br>
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
        // Fit the map to the BBQ sites' bounds
        map.fitBounds(window.currentBBQLayer.getBounds());
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load BBQ sites: ${error.message}`);
    }
});