var globalfilter = '';

function setglobalfilter(value) {
    globalfilter = value;
    console.log(globalfilter);
}

var ResortList = {};

ResortList['Squaw Valley'] = {pos: {lat: 39.1963, lng: -120.2336}, 
                              info: 'peak: 9,050 ft. trails: 170+'};
ResortList['Heavenly'] = {pos: {lat: 38.9377, lng: -119.9088}, 
                          info: 'peak: 10,067 ft. trails: 97'};
ResortList['Kirkwood'] = {pos: {lat: 38.6840, lng: -120.0693}, 
                          info: 'peak: 9,800 ft. trails: 65+'};
ResortList['Sugar Bowl'] = {pos: {lat: 39.3044, lng: -120.3358}, 
                            info: 'peak: 8,383 ft. trails: 103'};
ResortList['Mt Rose'] = {pos: {lat: 39.3292, lng: -119.8858}, 
                         info: 'peak: 9,700 ft. trails: 60+'};
ResortList['Northstar'] = {pos: {lat: 39.2733, lng: -120.1025}, 
                           info: 'peak: 8,610 ft. trails: 100'};
ResortList['Alpine Meadows'] = {pos: {lat: 39.1786, lng: -120.2277}, 
                                info: 'peak: 8,637 ft. trails: 100'};
ResortList['Sierra at Tahoe'] = {pos: {lat: 38.8078, lng: -120.0847}, 
                                 info: 'peak: 8,852 ft. trails: 46'};
ResortList['Bear Valley'] = {pos: {lat: 38.4922, lng: -120.0067}, 
                             info: 'peak: 8,500 ft. trails: 67'};
ResortList['Diamond Peak'] = {pos: {lat: 39.2539, lng: -119.9153}, 
                              info: 'peak: 8,540 ft. trails: 30'};


function SkiResort(name, position) {
    var self = this;
    self.name = name;
    self.position = position;
}

function ResortsViewModel() {
    var self = this;

    self.markers = {};
    self.filter = ko.observable('');
    self.resorts = [];

    self.placeMarker = function(name, position) {
        //console.log("placeMarker called");
        //console.log(name);
        //console.log(position);


       
        var marker = new window.google.maps.Marker({
            position: position,
            title: name,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function() {

            var lat = ResortList[name].pos.lat;
            var lng = ResortList[name].pos.lng;

            var squareurl = 'https://api.foursquare.com/v2/venues/search?client_id=IELX4KNZFYKNYAGXKB2LTGSFWQ2VUZLCYWUJBJLUEMVVXPWE&client_secret=NANOUHNSJ4FZPIU1C5YFA53P2ZDMZTBTQMBPHIGB5X0NWKKV&v=20140730&locale=en&radius=2000&ll=' + lat + ',' + lng + '&limit=5';
            var squarearr = [];

            var infowindow = new google.maps.InfoWindow({
                content: '<b>' + name + '</b>' + '<span> ' + ResortList[name].info + '</span>'
            });

            $.getJSON(squareurl, function(data){
                //console.log(data.response.venues.map(function(venue){
                //    return venue.name + " (" + venue.categories[0].name + ")";
                //}));
                squarearr = data.response.venues.map(function(venue){
                    if (venue.categories[0]) {
                        return '<li>' + venue.name + ' (' + venue.categories[0].name + ')' + '</li>';
                    } else {
                        return '<li>' + venue.name + '(?)' + '</li>';
                    }                    
                });
                console.log(squarearr);
                console.log(data.response.venues);
                console.log(infowindow);
                squarestring = squarearr.join('');
                console.log(squarestring);
                infowindow.content = infowindow.content + '<p>FourSquare Top Picks:<ol>' + squarestring + '</ol></p>';
                infowindow.open(map, marker);
            }).error(function(e){
                console.log(e);
                var infowindow = new google.maps.InfoWindow({
                    content: '<b>' + name + '</b>' + '<span> ' + ResortList[name].info + '</span><p><h4>' + 'FourSquare top picks did not load ...' + '</h4></p>'
                });
                infowindow.open(map, marker);
            });
        });

        marker.addListener('click', function() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() { marker.setAnimation(null);}, 1410);
        });
        marker.setMap(map);
        self.markers[name] = marker;
        //console.log(self.markers);
    }

    for (var resort in ResortList) {
        self.resorts.push(new SkiResort(resort, ResortList[resort].pos));
        self.placeMarker(resort, ResortList[resort].pos);
    }
    

    // Sets the map on all markers in the array.
    self.setMapOnAll = function(map) {
        for (var marker in self.markers) {
            //console.log(self.markers[marker]);
            self.markers[marker].setMap(map);
        }
    }


    var dfilter = document.getElementById('drawerfilter');
    dfilter.addEventListener('input', function(event) {
        console.log(dfilter.value);
        self.filter(dfilter.value);
    });

    //filter the items using the filter text
    self.filteredItems = ko.computed(function() {
        //console.log("filteredItem called");
        self.setMapOnAll(null);

        var filter = this.filter().toLowerCase();
        if (!filter) {
            self.setMapOnAll(map);
            return this.resorts;
        } else {
            return ko.utils.arrayFilter(this.resorts, function(item) {
 
                if ( item.name.toLowerCase().indexOf(filter) !== -1 ) {
                    //console.log(item.name);
                    self.markers[item.name].setMap(map);
                    return item;
                }
            });
        }
    }, self);

    self.onclickResort = function(data) {
        //console.log("resort from list clicked");
        //console.log(data.name);
        new google.maps.event.trigger(self.markers[data.name],'click');
    }
    
}

ko.applyBindings(new ResortsViewModel());
