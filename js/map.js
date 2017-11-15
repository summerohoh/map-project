/**function 	mapLocation(location) {
  var self = this;
  self.place = ko.observable(location);
}
**/
function ListViewModel(){
  //Data
  var self = this;
  self.locations =[
          {name: 'Aladdin\'s Natural Eatery', location: {lat: 42.441812, lng: -76.486502}},
          {name: 'Herbert F. Johnson Museum of Art', location: {lat: 42.450694, lng: -76.486172}},
          {name: 'Collegetown Bagels', location: {lat: 42.442379, lng: -76.484943}},
          {name: 'Cornell Dairy Bar', location: {lat: 42.447145, lng: -76.470797}},
          {name: 'FR Newman Arboretum', location: {lat: 42.451541, lng: -76.454528}},
          {name: 'Saigon Kitchen', location: {lat: 42.439465, lng: -76.507457}}
        ];

  self.selectedId = ko.observable();

  //Behaviors

  self.displaySelected = function(location){
    self.selectedId(location);
  };

/**
  self.places = ko.observableArray([
          new mapLocation(self.locations[0])
  ]);
**/

}

ko.applyBindings(new ListViewModel());

    var map;

		//blank array for listings markers.
		var markers=[];

      	function initMap() {
        	var ithaca = {lat: 42.441459, lng: -76.485033};
        	var map = new google.maps.Map(document.getElementById('map'), {
         			zoom: 15,
          			center: ithaca
        	});

        //listings of my favorite places in ithaca.
        var locations = [
          {title: 'Aladdin\'s Natural Eatery', location: {lat: 42.441812, lng: -76.486502}},
          {title: 'Herbert F. Johnson Museum of Art', location: {lat: 42.450694, lng: -76.486172}},
          {title: 'Collegetown Bagels', location: {lat: 42.442379, lng: -76.484943}},
          {title: 'Cornell Dairy Bar', location: {lat: 42.447145, lng: -76.470797}},
          {title: 'FR Newman Arboretum', location: {lat: 42.451541, lng: -76.454528}},
          {title: 'Saigon Kitchen', location: {lat: 42.439465, lng: -76.507457}}
        ];

        var myInfowindow = new google.maps.InfoWindow();
		    var bounds = new google.maps.LatLngBounds();

        //place markers for locations stored in data
        for (var i = 0; i < locations.length; i++){
        	var position = locations[i].location;
        	var title = locations[i].title;
        	//create a marker for location
        	var marker = new google.maps.Marker({
    					 position: position,
    					 map: map,
    					 title: title,
    					 animation: google.maps.Animation.DROP,
    					 id: i,
 						 });
        	//push the marker to markers array
        	markers.push(marker);
        	//make infowindow for each markers
        	marker.addListener('click', function(){
        		makeInfoWindows(this, myInfowindow);
        	});
        	//extend the bounds for new marker
        	bounds.extend(marker.position);
        	map.fitBounds(bounds);
        }

        document.getElementById('show').addEventListener('click', showMarkers);
        document.getElementById('hide').addEventListener('click', hideMarkers);

        function showMarkers(){
          var bounds = new google.maps.LatLngBounds();
          for (var i=0; i<markers.length; i++){
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
          }
          map.fitBounds(bounds);
        }

        function hideMarkers(){
          var bounds = new google.maps.LatLngBounds();
          for (var i=0; i<markers.length; i++){
            markers[i].setMap(null);
            bounds.extend(markers[i].position);
          }
          map.fitBounds(bounds);
        }

        function makeInfoWindows(marker, infowindow){
        	//make sure the infowindow is not open yet
        	if (infowindow.marker != marker){
        		infowindow.marker = marker;
        		infowindow.setContent('<div>'+ marker.title + '</div>');
        		infowindow.open(map,marker);
        		//make sure marker closes on close
        		infowindow.addListener('closeclick',function(){
        			infowindow.setMarker = null;
        		});
        	}
       }
    };