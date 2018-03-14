
# Map of Ithaca #
###### Summer J. Oh ######

## Overview
> A single page web application featuring an interactive map of my neighborhood - Ithaca, NY. Users can view and search locations in the list view handled by Knockout.js. Clicking on a specific location or a marker display infowindow containing third-party(Foursqaure) data about the location retreived asyncronously. The app follows MVVM architecture and is fully responsive. [Live Demo](https://summerohoh.github.io/map-project/)


## Key Features ##

 * **Live Search**: A search function implemented using Knockout.js. helps to easily filter locations in the list. Both the list view and the map marker respond live to the search query. 
 * **Highlighted Location**: Clicking a location on the list or a marker on the map displays unique information about the location and trigger animation to its associated map marker. 
 * **Third-party data** : Information on locations are retrieved via Foursquare API. 
 * **Asynchronous API Requests**: All data requests are retrieved in an asynchronous manner using AJAX. Errors are handled. 
 * **MVVM Code Structure**: Code follows an MVVM pattern based upon Knockout best practices. 
 * **Interface Design**: Built with materialize.js, the app is fully responsive and usable across modern desktop, tablet, and phone browsers. 

## Installation ##

To run the application locally: 

#### 1. Clone this repo
    git clone https://github.com/summerohoh/map-project.git

#### 2. Open index.html file

## References 

 * Udacity - Full Stack Developer Nanodegree
 	* Frontend: Javascript & AJAX
    * [Asynchronous JavaScript Requests](https://www.udacity.com/course/asynchronous-javascript-requests--ud109)
 * [Knockout.js](http://knockoutjs.com)
 * [Google Map API](https://developers.google.com/maps/documentation/)
 * [Foursquare API](https://developer.foursquare.com)
 * [Materialize.js](http://materializecss.com)
