/*** MODEL ***/
var locations = [
          {id:0, name: 'Cornell Store', location: {lat: 42.446734, lng: -76.484649}},
          {id:1, name: 'Herbert F. Johnson Museum of Art', location: {lat: 42.450694, lng: -76.486172}},
          {id:2, name: 'Collegetown Bagels', location: {lat: 42.442379, lng: -76.484943}},
          {id:3, name: 'Cornell Dairy Bar', location: {lat: 42.447145, lng: -76.470797}},
          {id:4, name: 'FR Newman Arboretum', location: {lat: 42.451541, lng: -76.454528}},
          {id:5, name: 'Saigon Kitchen', location: {lat: 42.439465, lng: -76.507457}},
          {id:6, name: 'Ithaca Farmers Market', location: {lat: 42.4509578, lng: -76.5112756}},
          {id:7, name: 'Ithaca Falls', location: {lat: 42.452925, lng: -76.491654}},
          {id:8, name: 'Uris Library', location: {lat: 42.447748, lng: -76.485310}},
          {id:9, name: 'Stewart Park', location: {lat: 42.461327, lng: -76.505408}},
          {id:10, name: 'Beebe Lake', location: {lat: 42.451010, lng: -76.476190}},
          {id:11, name: 'Gimme Coffee', location: {lat: 42.439456, lng: -76.506456}},
          {id:12, name: 'Waffle Frolick', location: {lat: 42.439759, lng: -76.497395}}
        ];

 var map;
 var bounds;
 var myInfowindow;

function initMap() {

    var ithaca = {lat: 42.41459, lng: -76.485033};
    map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 10,
                  center: ithaca,
                  styles: [
                  //"Flat Map with Labels" Style by Roberta on Snazzy Maps
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "hue": "#7fc8ed"
                                    },
                                    {
                                        "saturation": 55
                                    },
                                    {
                                        "lightness": -6
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "hue": "#7fc8ed"
                                    },
                                    {
                                        "saturation": 55
                                    },
                                    {
                                        "lightness": -6
                                    },
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#83cead"
                                    },
                                    {
                                        "saturation": 1
                                    },
                                    {
                                        "lightness": -15
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#f3f4f4"
                                    },
                                    {
                                        "saturation": -84
                                    },
                                    {
                                        "lightness": 59
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "hue": "#ffffff"
                                    },
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 100
                                    },
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffffff"
                                    },
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 100
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "hue": "#bbbbbb"
                                    },
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 26
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffcc00"
                                    },
                                    {
                                        "saturation": 100
                                    },
                                    {
                                        "lightness": -35
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffcc00"
                                    },
                                    {
                                        "saturation": 100
                                    },
                                    {
                                        "lightness": -22
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.school",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "hue": "#d7e4e4"
                                    },
                                    {
                                        "saturation": -60
                                    },
                                    {
                                        "lightness": 23
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            }
                          ]
    });

    myInfowindow = new google.maps.InfoWindow({maxWidth:400});
    bounds = new google.maps.LatLngBounds();
    // create markers for all locations initially 
    for (var i = 0; i < locations.length; i++){
          var position = locations[i].location;
          var name = locations[i].name;
          createMarker(position, name, i);
    };

  ko.applyBindings(new ViewModel());

};

// create a marker for given location
function createMarker(position,name, i){
      
    var marker = new google.maps.Marker({
               position: position,
               map: map,
               name: name,
               animation: google.maps.Animation.DROP,
               id: i,
             });

    locations[i].marker = marker;

    //handle click on marker
    marker.addListener('click', function(){
            //make and open infowindow
            makeInfoWindows(this, myInfowindow);
            //highlight selected item on the list
            var thisli = $('li.location:contains("' +marker.name +'")');
            if ($(window).width()>600){ //tablet and below
              thisli[0].click();
            }else{ // desktop
              thisli[1].click();
            }
          });

    //extend the bounds for new marker
    bounds.extend(marker.position);
    map.fitBounds(bounds);
};


// Credentials for Foursquare API 
var CLIENT_ID = 'PLI5CCYKVLMH141OJGJRF1PSVAFOPOE5GKQFXXM0WTX1XOS1';
var CLIENT_SECRET = 'Q1C5LMJZ0KOQJKGKDJB4UKVC5FURTRJ1O4J3WXPZ4MXG2XW5';
var version = '20180306';

function makeInfoWindows(marker, infowindow){

          var lat = marker.getPosition().lat();
          var lng = marker.getPosition().lng();
          var url = "https://api.foursquare.com/v2/venues";

          //make sure the infowindow is not open yet
          if (infowindow.marker != marker){
            infowindow.marker = marker;
            //make asyncronous request for Foursquare API
            //request query search first 
            $.ajax({
              url: url + '/search?',
              dataType: 'json',
              data: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                v: version,
                ll:lat+','+lng,
                query:marker.name,
                async: true
              }, //once venue ID is found, request venue search
              success: function(searchdata) {
                  result = searchdata['response']['venues'][0];
                  location_id = result.id;
                  $.ajax({
                  url: url + '/' +location_id,
                  dataType: 'json',
                  data: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    v: version,
                    async: true
                  },
                  success: function(venuedata) {
                  //store necessary data
                  result = venuedata['response']['venue'];
                  result_Address = result.location.formattedAddress;
                  photo_item = result.photos.groups[0].items[0]
                  photoURL = photo_item.prefix+'150x150'+photo_item.suffix;
                  tip1 = result.tips.groups[0].items[0];
                  tip2 = result.tips.groups[0].items[1];
                  user_photo1= tip1.user.photo.prefix +'36x36'+ tip1.user.photo.suffix;
                  user_photo2= tip2.user.photo.prefix +'36x36'+ tip2.user.photo.suffix;
                  // display photo, title, category and address of the location
                  content ='<div class="info-container">';
                  content +='<div class="row content">' 
                  content +='<div class="col s5 m5 l6 img-container"><img class="location-img" src="'+ photoURL+'"> </div>';
                  content +='<div class="col s7 m7 l6 location-info"><p class="location-name">'+ result.name+ '</p>';
                  content +='<a class="btn location-category">'+result.categories[0].name+ '</a>';
                  content +='<p class="location-address"><i id="locationicon" class="material-icons">place</i>'+ result_Address[0] +'<br>'+ result_Address[1] +'</p> </div> </div>';
                  content +='<hr><div class="row content">' ;
                  // display either description or user tips
                  if (result.description){ 
                    content +='<p class="description-type"> Description </p>';
                    content +='<div class="col l12"> <p class="location-description">'+ result.description+ '</p></div><br>';
                  }else { //If description is not available, display two user tips instead. 
                    content +='<p class="description-type"> Tips </p>';
                    content +='<div class="col l12 location-tip valign-wrapper">';
                    content +='<div class="col l2"> <img class="tip-user circle" src="'+ user_photo1 +'"></div>';
                    content +='<div class="col l10"> <p class="location-tip">"'+ tip1.text + '"</p></div></div>';
                    content +='<div class="col l12 location-tip valign-wrapper">';
                    content +='<div class="col l2"> <img class="tip-user circle" src="'+ user_photo2 +'"></div>';
                    content +='<div class="col l10"> <p class="location-tip">"'+ tip2.text + '"</p></div></div>';
                  };
                  content +='</div>'
                  // display Foursquare  
                  content +='<div class="col l12 infofooter">';
                  content +='<a href="https://foursquare.com/v/' +result.id + '">';
                  content +='<img src="./img/Powered-by-Foursquare-one-color-300.png"></a> </div> ';
                  infowindow.setContent(content); 
              } 
            });
            }, // Error handling for Foursquare API
            error: function(e){
              content ='<p class="error">';
              content += 'Data could not be loaded from Foursquare. <br>' ;
              content += 'Error status: ' + e.status;
              content += '</p>';
              infowindow.setContent(content); 
            }    
          });

            infowindow.open(map, marker);
            //make sure marker closes on close
            infowindow.addListener('closeclick',function(){
              infowindow.marker.setAnimation(null);
              infowindow.setMarker = null;
              $( "li.mobile-list-items" ).removeClass("selected");
            });
          }
};


var Loc = function(data) {
  this.id= data.id;
  this.name = data.name;
  this.location = data.location;
  this.marker = data.marker;
};

/*** VIEW MODEL ***/

function ViewModel() {

    var self = this;
    self.selectedId = ko.observable();
    self.query= ko.observable('');
    self.list = ko.observableArray();
    locations.forEach(function(location) {
    self.list.push(new Loc(location))
  });

    // Display infowindow when location on list is clicked 
    self.displaySelected = function(place) {
      //undo click if already clicked
      if (self.selectedId() == place.id){
        self.selectedId(null);
        place.marker.setAnimation(null);
        myInfowindow.close();
      } //display infowindow
      else{self.selectedId(place.id);
         console.log(self.selectedId());
        for (var i = 0; i < self.list().length; i++){
         if(self.selectedId() == self.list()[i].marker.id){
          self.list()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
        }else{
          self.list()[i].marker.setAnimation(null);
        }
           
    };
       
        makeInfoWindows(self.list()[place.id].marker, myInfowindow);
        map.panTo(place.location);
      };
    };
    // List View and marker updated for live search 
    self.filteredLocation = ko.computed(function() {
    var search = self.query().toLowerCase();
    if (!search) {
      ko.utils.arrayForEach(self.list(), function (place) {
        place.marker.setVisible(true);
      });
      return self.list();
    } else {
      return ko.utils.arrayFilter(self.list(), function(place) {
        var result = (place.name.toLowerCase().search(search) >= 0)
        place.marker.setVisible(result);
        return result;
      });
    }
  });
};