// JavaScript to toggle sidebars
const trailFilterTab = document.getElementById('trailFilterTab');
const attractionFilterTab = document.getElementById('attractionFilterTab');
const bbqSiteFilterTab = document.getElementById('bbqSiteFilterTab');
const campsiteFilterTab = document.getElementById('campsiteFilterTab');
const viewpointFilterTab = document.getElementById('viewpointFilterTab');
const moreInfoTab = document.getElementById('moreInfoTab');

const trailFilterSidebar = document.getElementById('trailFilterSidebar');
const attractionFilterSidebar = document.getElementById('attractionFilterSidebar');
const bbqSiteFilterSidebar = document.getElementById('bbqSiteFilterSidebar');
const campsiteFilterSidebar = document.getElementById('campsiteFilterSidebar');
const viewpointFilterSidebar = document.getElementById('viewpointFilterSidebar');
const moreInfoSidebar = document.getElementById('moreInfoSidebar');        

trailFilterTab.addEventListener('click', () => {
    const isActive = trailFilterSidebar.classList.contains('active');
    trailFilterSidebar.classList.toggle('active', !isActive);
    moreInfoSidebar.classList.remove('active');
    attractionFilterSidebar.classList.remove('active');
    bbqSiteFilterSidebar.classList.remove('active');
    campsiteFilterSidebar.classList.remove('active');
    viewpointFilterSidebar.classList.remove('active');
});

moreInfoTab.addEventListener('click', () => {
    const isActive = moreInfoSidebar.classList.contains('active');
    moreInfoSidebar.classList.toggle('active', !isActive);
    trailFilterSidebar.classList.remove('active');
    attractionFilterSidebar.classList.remove('active');
    bbqSiteFilterSidebar.classList.remove('active');
    campsiteFilterSidebar.classList.remove('active');
    viewpointFilterSidebar.classList.remove('active');
});

attractionFilterTab.addEventListener('click', () => {
    const isActive = attractionFilterSidebar.classList.contains('active');
    attractionFilterSidebar.classList.toggle('active', !isActive);
    trailFilterSidebar.classList.remove('active');
    moreInfoSidebar.classList.remove('active');
    bbqSiteFilterSidebar.classList.remove('active');
    campsiteFilterSidebar.classList.remove('active');
    viewpointFilterSidebar.classList.remove('active');
});

bbqSiteFilterTab.addEventListener('click', () => {
    const isActive = bbqSiteFilterSidebar.classList.contains('active');
    bbqSiteFilterSidebar.classList.toggle('active', !isActive);
    trailFilterSidebar.classList.remove('active');
    moreInfoSidebar.classList.remove('active');
    attractionFilterSidebar.classList.remove('active');
    campsiteFilterSidebar.classList.remove('active');
    viewpointFilterSidebar.classList.remove('active');
});

campsiteFilterTab.addEventListener('click', () => {
    const isActive = campsiteFilterSidebar.classList.contains('active');
    campsiteFilterSidebar.classList.toggle('active', !isActive);
    trailFilterSidebar.classList.remove('active');
    moreInfoSidebar.classList.remove('active');
    attractionFilterSidebar.classList.remove('active');
    bbqSiteFilterSidebar.classList.remove('active');
    viewpointFilterSidebar.classList.remove('active');
});

viewpointFilterTab.addEventListener('click', () => {
    const isActive = viewpointFilterSidebar.classList.contains('active');
    viewpointFilterSidebar.classList.toggle('active', !isActive);
    trailFilterSidebar.classList.remove('active');
    moreInfoSidebar.classList.remove('active');
    attractionFilterSidebar.classList.remove('active');
    bbqSiteFilterSidebar.classList.remove('active');
    campsiteFilterSidebar.classList.remove('active');
});


