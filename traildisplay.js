// // Listen for the Generate Route button click event
// document.getElementById('generateRouteNameBtn').addEventListener('click', async () => {
//     try {
//         // Get the user-selected route name
//         const routeName = document.getElementById('routeName').value;

//         // Construct the request data
//         const requestData = {
//             routeName
//         };

//         // Send a request to the backend API
//         const response = await fetch('./getroutebyname.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestData)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.success) {
//             throw new Error(data.error);
//         }

//         // Clear the old route layer if it exists
//         if (window.currentRouteLayer) {
//             map.removeLayer(window.currentRouteLayer);
//         }

//         // Validate the GeoJSON data
//         if (!data.routeGeoJSON || data.routeGeoJSON.features.length === 0) {
//             alert('No route data found for the selected route name.');
//             return;
//         }

//         // Add the new route to the map
//         window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
//             style: { color: 'blue', weight: 4 }
//         }).addTo(map);

//         // Fit the map to the route bounds
//         const bounds = window.currentRouteLayer.getBounds();
//         if (bounds.isValid()) {
//             map.fitBounds(bounds);
//         } else {
//             alert('Invalid route data. Unable to display the route.');
//         }

//     } catch (error) {
//         console.error('Error:', error);
//         alert(`Failed to generate route: ${error.message}`);
//     }

// });

// // 监听 Generate Route 按钮点击事件
// document.getElementById('generateRouteBtn').addEventListener('click', async () => {
//     try {
//         // 获取用户选择的选项
//         const difficulty = document.getElementById('difficultyList').value;
//         const region = document.getElementById('regionName').value;
//         const wildlifeRisk = document.getElementById('wildlifeList').value;

//         // 构造请求数据
//         const requestData = {
//             difficulty,
//             region,
//             wildlifeRisk
//         };

//         // 发送请求到后端 API
//         const response = await fetch('./gethikingroute.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestData)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.success) {
//             throw new Error(data.error);
//         }

//         // 清除旧图层
//         if (window.currentRouteLayer) {
//             map.removeLayer(window.currentRouteLayer);
//         }

//         // 添加新路线到地图
//         window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
//             style: { color: 'blue', weight: 4 }
//         }).addTo(map);

//         // 缩放到路线范围
//         map.fitBounds(window.currentRouteLayer.getBounds());
//     } catch (error) {
//         console.error('Error:', error);
//         alert(`Failed to generate route: ${error.message}`);
//     }
// });      

// Listen for the Generate Route button click event
document.getElementById('generateRouteNameBtn').addEventListener('click', async () => {
    try {
        // Get the user-selected route name
        const routeName = document.getElementById('routeName').value;

        // Construct the request data
        const requestData = {
            routeName
        };

        // Send a request to the backend API
        const response = await fetch('./getroutebyname.php', {
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

        // Clear the old route layer if it exists
        if (window.currentRouteLayer) {
            map.removeLayer(window.currentRouteLayer);
        }

        // Validate the GeoJSON data
        if (!data.routeGeoJSON || data.routeGeoJSON.features.length === 0) {
            alert('No route data found for the selected route name.');
            return;
        }

        // // Add the new route to the map
        // window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
        //     style: { color: 'blue', weight: 4 }
        // }).addTo(map);

        window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Trail Name:</strong> ${feature.properties.trailname || 'N/A'}<br>
                        <strong>Difficulty:</strong> ${feature.properties.difficulty || 'N/A'}<br>
                        <strong>Region:</strong> ${feature.properties.region || 'N/A'}<br>
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
        
        // Fit the map to the route bounds
        const bounds = window.currentRouteLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid route data. Unable to display the route.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to generate route: ${error.message}`);
    }

});

// 监听 Generate Route 按钮点击事件
document.getElementById('generateRouteBtn').addEventListener('click', async () => {
    try {
        // 获取用户选择的选项
        const difficulty = document.getElementById('difficultyList').value;
        const region = document.getElementById('regionName').value;
        const wildlifeRisk = document.getElementById('wildlifeList').value;

        // 构造请求数据
        const requestData = {
            difficulty,
            region,
            wildlifeRisk
        };

        // 发送请求到后端 API
        const response = await fetch('./Untitled-1.php', {
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

        // 清除旧图层
        if (window.currentRouteLayer) {
            map.removeLayer(window.currentRouteLayer);
        }

    //     // 添加新路线到地图
    //     window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
    //         style: { color: 'blue', weight: 4 }
    //     }).addTo(map);

    //     // 缩放到路线范围
    //     map.fitBounds(window.currentRouteLayer.getBounds());
    // } catch (error) {
    //     console.error('Error:', error);
    //     alert(`Failed to generate route: ${error.message}`);
    // }
        // Add the new route to the map with hover effect
        window.currentRouteLayer = L.geoJSON(data.routeGeoJSON, {
            style: { color: 'blue', weight: 4 },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const popupContent = `
                        <strong>Trail Name:</strong> ${feature.properties.trailname || 'N/A'}<br>
                        <strong>Difficulty:</strong> ${feature.properties.difficulty || 'N/A'}<br>
                        <strong>Region:</strong> ${feature.properties.region || 'N/A'}<br>
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

        // Fit the map to the route bounds
        const bounds = window.currentRouteLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            alert('Invalid route data. Unable to display the route.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to generate route: ${error.message}`);
    }
});      
