// open/close drawer
var menu = document.querySelector('.menu');
var drawer = document.querySelector('.nav');

menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});


function ResortsViewModel() {

    var self = this;

    // Resorts view model section
    self.ResortList = {};

    self.ResortList['Squaw Valley'] = {pos: {lat: 39.1963, lng: -120.2336},
                                       info: 'peak: 9,050 ft. trails: 170+'};
    self.ResortList.Heavenly = {pos: {lat: 38.9377, lng: -119.9088},
                                info: 'peak: 10,067 ft. trails: 97'};
    self.ResortList.Kirkwood = {pos: {lat: 38.6840, lng: -120.0693},
                                info: 'peak: 9,800 ft. trails: 65+'};
    self.ResortList['Sugar Bowl'] = {pos: {lat: 39.3044, lng: -120.3358},
                                     info: 'peak: 8,383 ft. trails: 103'};
    self.ResortList['Mt Rose'] = {pos: {lat: 39.3292, lng: -119.8858},
                                  info: 'peak: 9,700 ft. trails: 60+'};
    self.ResortList.Northstar = {pos: {lat: 39.2733, lng: -120.1025},
                                 info: 'peak: 8,610 ft. trails: 100'};
    self.ResortList['Alpine Meadows'] = {pos: {lat: 39.1786, lng: -120.2277},
                                         info: 'peak: 8,637 ft. trails: 100'};
    self.ResortList['Sierra at Tahoe'] = {pos: {lat: 38.8078, lng: -120.0847},
                                          info: 'peak: 8,852 ft. trails: 46'};
    self.ResortList['Bear Valley'] = {pos: {lat: 38.4922, lng: -120.0067},
                                      info: 'peak: 8,500 ft. trails: 67'};
    self.ResortList['Diamond Peak'] = {pos: {lat: 39.2539, lng: -119.9153},
                                       info: 'peak: 8,540 ft. trails: 30'};
    self.ResortList.Boreal = {pos: {lat: 39.3317, lng: -120.3511},
                              info: 'peak: 7,700 ft. trails: 41'};
    self.ResortList.Homewood = {pos: {lat: 39.0827, lng: -120.1755},
                                info: 'peak: 7,881 ft. trails: 60'};

    self.markers = {};
    self.filter = ko.observable('');
    self.resorts = [];

    self.SkiResort = function(name, position) {
        var self = this;
        self.name = name;
        self.position = position;
    };

    // Singleton instance of info window
    self.cinfowindow = (function() {
        var instance;

        function createInstance() {
            var object = new google.maps.InfoWindow({ content: 'undefined' });
            return object;
        }

        return {
            getInstance: function() {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    // Create singleton
    self.infowindow = self.cinfowindow.getInstance();

    // Places markers on map. Adds events and infowindow to markers.
    self.placeMarker = function(name, position) {

        var marker = new window.google.maps.Marker({
            position: position,
            title: name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', function() {

            var lat = self.ResortList[name].pos.lat;
            var lng = self.ResortList[name].pos.lng;
            var squareurl = 'https://api.foursquare.com/v2/venues/search?client_id=IELX4KNZFYKNYAGXKB2LTGSFWQ2VUZLCYWUJBJLUEMVVXPWE&client_secret=NANOUHNSJ4FZPIU1C5YFA53P2ZDMZTBTQMBPHIGB5X0NWKKV&v=20140730&locale=en&radius=2000&ll=' + lat + ',' + lng + '&limit=5';
            var squarearray = [];
            //var infowindow = new google.maps.InfoWindow({
            //    content: '<b>' + name + '</b>' + '<span> ' + self.ResortList[name].info + '</span>'
            //});
            self.infowindow.content = '<b>' + name + '</b>' + '<span> ' + self.ResortList[name].info + '</span>';

            // Access Foursquare JSON
            $.getJSON(squareurl, function(data){
                squarearray = data.response.venues.map(function(venue){
                    if (venue.categories[0]) {
                        return '<li>' + venue.name + ' (' + venue.categories[0].name + ')' + '</li>';
                    } else {
                        return '<li>' + venue.name + '(?)' + '</li>';
                    }
                });
                squarestring = squarearray.join('');
                self.infowindow.content = self.infowindow.content + '<p>FourSquare Top Picks:<ol>' + squarestring + '</ol></p>';
                self.infowindow.open(map, marker);
            }).error(function(e){
                console.log(e);
                //var infowindow = new google.maps.InfoWindow({
                //    content: '<b>' + name + '</b>' + '<span> ' + self.ResortList[name].info + '</span><p><h4>' + 'FourSquare top picks did not load ...' + '</h4></p>'
                //});
                self.infowindow.content = '<b>' + name + '</b>' + '<span> ' + self.ResortList[name].info + '</span><p><h4>' + 'FourSquare top picks did not load ...' + '</h4></p>';
                self.infowindow.open(map, marker);
            });
        });

        marker.addListener('click', function() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() { marker.setAnimation(null);}, 1410);
        });
        // Place marker on map
        marker.setMap(map);
        // Store marker
        self.markers[name] = marker;
    };

    // De-/activate  map on all markers in the array.
    self.setMapOnAll = function(map) {
        for (var marker in self.markers) {
            self.markers[marker].setMap(map);
        }
    };

    // Put event listener on the filter input
    var dfilter = document.getElementById('filter');
    dfilter.addEventListener('input', function(event) {
        self.filter(dfilter.value);
    });

    // Filter the items using the filter text and KO computable
    self.filteredItems = ko.computed(function() {

        self.setMapOnAll(null);

        var filter = this.filter().toLowerCase();
        if (!filter) {
            self.setMapOnAll(map);
            return this.resorts;
        } else {
            return ko.utils.arrayFilter(this.resorts, function(item) {
                if ( item.name.toLowerCase().indexOf(filter) !== -1 ) {
                    self.markers[item.name].setMap(map);
                    return item;
                }
            });
        }
    }, self);

    // Trigger marker when resort is clicked in list
    self.onclickResort = function(data) {
        new google.maps.event.trigger(self.markers[data.name],'click');
    };

    // MAIN: Generate list of resorts and markers
    for (var resort in self.ResortList) {
        self.resorts.push(new self.SkiResort(resort, self.ResortList[resort].pos));
        self.placeMarker(resort, self.ResortList[resort].pos);
    }

}

ko.applyBindings(new ResortsViewModel());
