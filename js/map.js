var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: {lat: -34.397, lng: 150.644},
        center: {lat: 39.0772408, lng: -120.049513},
        zoom: 10
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.1963, lng: -120.2336},
        map: map,
        title: 'Squaw Valley'
    });
   var marker = new google.maps.Marker({
        position: {lat: 38.9376854, lng: -119.9087913},
        map: map,
        title: 'Heavenly'
    });
    var marker = new google.maps.Marker({
        position: {lat: 38.683978, lng: -120.069321},
        map: map,
        title: 'Kirkwood'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.3044, lng: -120.3358},
        map: map,
        title: 'Sugar Bowl'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.3292, lng: -119.8858},
        map: map,
        title: 'Mt.Rose'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.2733, lng: -120.1025},
        map: map,
        title: 'Northstar'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.1786, lng: -120.2277},
        map: map,
        title: 'Alpine Meadows'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.085558100, lng: -120.160388900},
        map: map,
        title: 'Homewood'
    });
    var marker = new google.maps.Marker({
        position: {lat: 38.807825600, lng: -120.084721200},
        map: map,
        title: 'Sierra at Tahoe'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.3317, lng: -120.3511},
        map: map,
        title: 'Boreal'
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.2539, lng: -119.9153},
        map: map,
        title: 'Diamond Peak'
    });

}

/*
var marker = new google.maps.Marker({
    position: {lat: 39.1963, lng: -120.2336},
    title:"Squaw Valley"
});

// To add the marker to the map, call setMap();
marker.setMap(map);
*/

      
/*
 * Open the drawer when the menu ison is clicked.
 */
var menu = document.querySelector('#menu');
var drawer = document.querySelector('.nav');

menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});
