var ResortList = {};

ResortList['Squaw Valley'] = {lat: 39.1963, lng: -120.2336};
ResortList['Heavenly'] = {lat: 38.9377, lng: -119.9088};
ResortList['Kirkwood'] = {lat: 38.6840, lng: -120.0693};
ResortList['Sugar Bowl'] = {lat: 39.3044, lng: -120.3358};
ResortList['Mt Rose'] = {lat: 39.3292, lng: -119.8858};
ResortList['Northstar'] = {lat: 39.2733, lng: -120.1025};
ResortList['Alpine Meadows'] = {lat: 39.1786, lng: -120.2277};
//ResortList['Mammoth Mountain'] = {lat: 37.6507, lng: -119.0374};
ResortList['Sierra at Tahoe'] = {lat: 38.8078, lng: -120.0847};
ResortList['Bear Valley'] = {lat: 38.4922, lng: -120.0067};
ResortList['Diamond Peak'] = {lat: 39.2539, lng: -119.9153};
//ResortList['Dodge Ridge'] = {lat: 38.1896, lng: -119.9564};
    

function SkiResort(name, position) {
    var self = this;
    self.name = name;
    self.position = position;
}

function ResortsViewModel() {
    var self = this;

    self.markers = [];

    self.filter = ko.observable('');
    //self.resorts = ko.observableArray([]);
    self.resorts = [];

    self.placeMarker = function(name, position) {
        //console.log("placeMarker called");
        //console.log(name);
        //console.log(position);
        var marker = new window.google.maps.Marker({
            position: position,
            title: name
        });
        marker.setMap(map);
        self.markers.push(marker);
    }

    for (var resort in ResortList) {
        self.resorts.push(new SkiResort(resort, ResortList[resort]));
        self.placeMarker(resort, ResortList[resort]);
    }
    

    // Sets the map on all markers in the array.
    self.setMapOnAll = function(map) {
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].setMap(map);
        }
    }

    //filter the items using the filter text
    self.filteredItems = ko.computed(function() {
        //console.log("filteredItem called");
        self.setMapOnAll(null);

        var filter = this.filter().toLowerCase();
        if (!filter) {
            self.markers.map( function(marker) {
                marker.setMap(map);
            });
            return this.resorts;
        } else {
            return ko.utils.arrayFilter(this.resorts, function(item) {
                //console.log(item.name);
 
                if ( item.name.toLowerCase().indexOf(filter) !== -1 ) {
                    //console.log(item.name);
                    self.markers.map( function(marker) {
                        if (item.name == marker.title) marker.setMap(map);
                    });
                    return item;
                }
            });
        }
    }, self);

}

ko.applyBindings(new ResortsViewModel());
