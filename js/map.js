var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: {lat: -34.397, lng: 150.644},
        center: {lat: 38.9019, lng: -120.0471},
        zoom: 10
    });
}

initMap();
