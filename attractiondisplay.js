// Listen for the Generate Attraction button click event
document.getElementById('generateAttractionNameBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected attraction name
        const attractionName = document.getElementById('attractionName').value;

        // Construct the request data
        const requestData = {
            attractionName
        };

        // Send a request to the backend API
        const response = await fetch('./getattbyname.php', {
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

        // Clear the old attraction layer if it exists
        if (window.currentAttractionLayer) {
            map.removeLayer(window.currentAttractionLayer);
        }

        // Validate the GeoJSON data
        if (!data.attractionGeoJSON || data.attractionGeoJSON.features.length === 0) {
            alert('No attraction data found for the selected attraction name.');
            return;
        }

        // // Add the new attraction to the map
        // window.currentAttractionLayer = L.geoJSON(data.attractionGeoJSON, {
        //     style: { color: 'green', weight: 4 }
        // }).addTo(map);
        window.currentAttractionLayer = L.geoJSON(data.attractionGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Attraction Name:</strong> ${feature.properties.attname || 'N/A'}<br>
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

        // Fit the map to the attraction bounds
        const bounds = window.currentAttractionLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid attraction data. Unable to display the attraction.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load attraction: ${error.message}`);
    }
});

document.getElementById('generateAttractionBtn').addEventListener('click', async () => {
    try {
        // Get user-selected options
        const wildlifeRisk = document.getElementById('attpigList').value;

        // Construct the request data
        const requestData = {
            wildlifeRisk
        };

        // Send a request to the backend API
        const response = await fetch('./getatt.php', {
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

        // Clear the old attraction layer if it exists
        if (window.currentAttractionLayer) {
            map.removeLayer(window.currentAttractionLayer);
        }

        // // Add the new attractions to the map
        // window.currentAttractionLayer = L.geoJSON(data.attractionGeoJSON, {
        //     style: { color: 'green', weight: 4 }
        // }).addTo(map);
        window.currentAttractionLayer = L.geoJSON(data.attractionGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Attraction Name:</strong> ${feature.properties.attname || 'N/A'}<br>
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

        // Fit the map to the attractions' bounds
        map.fitBounds(window.currentAttractionLayer.getBounds());
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to load attractions: ${error.message}`);
    }
});
