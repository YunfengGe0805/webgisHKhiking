// Add event listener for the "Clear Search Result" button
document.getElementById('clearSearchBtn').addEventListener('click', () => {
    // Clear all layers except the base map
    map.eachLayer(layer => {
        if (layer !== osm) {
            map.removeLayer(layer);
        }
    });

    // Reset the map to the initial zoom extent
    map.setView(initialCoordinates, initialZoom);

    // Clear filter items in the sidebar
    document.getElementById('routeName').value = '';
    document.getElementById('difficultyList').value = 'All';
    document.getElementById('regionName').value = '';
    document.getElementById('wildlifeList').value = 'All';
    document.getElementById('attractionName').value = '';
    document.getElementById('attpigList').value = 'All';
    document.getElementById('bbqName').value = '';
    document.getElementById('bbqpigList').value = 'All';
    document.getElementById('campName').value = '';
    document.getElementById('waterList').value = 'All';
    document.getElementById('tentList').value = 'All';
    document.getElementById('campigList').value = 'All';
    document.getElementById('viewName').value = '';
    document.getElementById('viepigList').value = 'All';
});