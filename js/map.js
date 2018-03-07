var locations = [
          {id:0, name: 'Aladdin\'s Natural Eatery', location: {lat: 42.441812, lng: -76.486502}},
          {id:1, name: 'Herbert F. Johnson Museum of Art', location: {lat: 42.450694, lng: -76.486172}},
          {id:2, name: 'Collegetown Bagels', location: {lat: 42.442379, lng: -76.484943}},
          {id:3, name: 'Cornell Dairy Bar', location: {lat: 42.447145, lng: -76.470797}},
          {id:4, name: 'FR Newman Arboretum', location: {lat: 42.451541, lng: -76.454528}},
          {id:5, name: 'Saigon Kitchen', location: {lat: 42.439465, lng: -76.507457}}
        ];

function ViewModel() {
    // Data
    var self = this;

    self.selectedId = ko.observable();
    self.selectedData = ko.observable();

    // Show inbox by default
    self.query= ko.observable('');

    // Behaviours
    self.displaySelected = function(place) {
      //undo click if already clicked
      if (self.selectedId() == place.id){
        self.selectedId(null);
        showAllMarkers();
        myInfowindow.close();
      } //display selected place's marker only
      else{ self.selectedId(place.id);
        hideMarkers();
        showMarker(map, place.id);
        makeInfoWindows(markers[place.id], myInfowindow);
      };
    };

    self.locations = ko.dependentObservable(function() {
        return ko.utils.arrayFilter(locations, function(place) {
          var search = self.query().toLowerCase();
            return place.name.toLowerCase().indexOf(search) >=0;
        });
    });

};


 var markers = [];
 var map;
 var bounds;
 var myInfowindow;


function initMap() {

    var ithaca = {lat: 42.441459, lng: -76.485033};
    map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 15,
                  center: ithaca
                 });
    myInfowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++){
          var position = locations[i].location;
          var name = locations[i].name;
          createMarker(position, name, i);
  };
};

function createMarker(position,name, i){
          //create a marker for location
          var marker = new google.maps.Marker({
               position: position,
               map: map,
               name: name,
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
        };


function hideMarkers(){
          var bounds = new google.maps.LatLngBounds();
          for (var i=0; i<markers.length; i++){
            markers[i].setMap(null);
            bounds.extend(markers[i].position);
          }
          map.fitBounds(bounds);
        };

function showMarker(map, i){
          //var bounds = new google.maps.LatLngBounds();
            markers[i].setMap(map);
            //bounds.extend(markers[i].position);
            //map.fitBounds(bounds);
        };


function showAllMarkers(){
          var bounds = new google.maps.LatLngBounds();
          for (var i=0; i<markers.length; i++){
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
          }
          map.fitBounds(bounds);
        };

        document.getElementById('show').addEventListener('click', showAllMarkers);
        document.getElementById('hide').addEventListener('click', hideMarkers);



function makeInfoWindows(marker, infowindow){
          //make sure the infowindow is not open yet
          if (infowindow.marker != marker){
            infowindow.marker = marker;
            location = foursquare(marker);
            infowindow.setContent('<div>'+ 'hi' + '</div>');
            infowindow.open(map,marker);
            //make sure marker closes on close
            infowindow.addListener('closeclick',function(){
              infowindow.setMarker = null;
            });
          }
};

// Credentials for Foursquare API 
client_id = 'PLI5CCYKVLMH141OJGJRF1PSVAFOPOE5GKQFXXM0WTX1XOS1';
client_secret='Q1C5LMJZ0KOQJKGKDJB4UKVC5FURTRJ1O4J3WXPZ4MXG2XW5';

function foursquare(marker){ 

  var location =[];
  var lat = marker.getPosition().lat();
  var lng = marker.getPosition().lng();
  
  URL = 'https://api.foursquare.com/v2/venues/search';
  URL += '?client_id=' + client_id;
  URL += '&client_secret=' + client_secret;
  URL += '&ll=' + lat + ',' + lng; 
  //URL += '&query=' + marker.name;
  URL += '&v=20180305';
  console.log(URL);


  $.getJSON(URL, function(data) {
    var results =data.response.venues[0];
    location = [{location_id: results.id}];
    console.log(location);
  }).fail(function() {
    alert("Error with Foursquare API call");
  });
  
  return location;
  
};


ko.applyBindings(new ViewModel());
