var latitude;
var longitude;
if (!navigator.geolocation) {
	alert('Geolocation is not supported by your browser');
}
else {
	navigator.geolocation.getCurrentPosition(success, error);
}

function error() {
	alert('Unable to retrieve your location');
}

function success(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	// Instantiate a map and platform object:
	var platform = new H.service.Platform({
		'apikey': 'Vt4QTRVwcF2R6HRO2qsGMpOpZJjieecpCsI9MVEWbQk'
	});
	// Retrieve the target element for the map:
	var targetElement = document.getElementById('mapContainer');
	// Get the default map types from the platform object:
	var defaultLayers = platform.createDefaultLayers();
	// Instantiate the map:
	var map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map, {
		zoom: 10
		, center: {
			lat: latitude
			, lng: longitude
		}
	});
	// Create the default UI:
	var ui = H.ui.UI.createDefault(map, defaultLayers);
	// Enable the event system on the map instance:
	var mapEvents = new H.mapevents.MapEvents(map);
	// Instantiate the default behavior, providing the mapEvents object:
	var behavior = new H.mapevents.Behavior(mapEvents);
	// Create the parameters for the routing request:
	var routingParameters = {
		'routingMode': 'fast'
		, 'transportMode': 'car'
		, // The start point of the route:
		'origin': latitude + ',' + longitude
		, // The end point of the route:
		'destination': (latitude + 1) + ',' + (longitude - 1)
		, // Include the route shape in the response
		'return': 'polyline'
	};
	// Define a callback function to process the routing response:
	var onResult = function (result) {
		// ensure that at least one route was found
		if (result.routes.length) {
			result.routes[0].sections.forEach((section) => {
				// Create a linestring to use as a point source for the route line
				let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
				// Create a polyline to display the route:
				let routeLine = new H.map.Polyline(linestring, {
					style: {
						strokeColor: 'blue'
						, lineWidth: 3
					}
				});
				// Create a marker for the start point:
				let startMarker = new H.map.Marker(section.departure.place.location);
				// Create a marker for the end point:
				let endMarker = new H.map.Marker(section.arrival.place.location);
				// Add the route polyline and the two markers to the map:
				map.addObjects([routeLine, startMarker, endMarker]);
				// Set the map's viewport to make the whole route visible:
				map.getViewModel().setLookAtData({
					bounds: routeLine.getBoundingBox()
				});
			});
		}
	};
	// Get an instance of the routing service version 8:
	var router = platform.getRoutingService(null, 8);
	// Call calculateRoute() with the routing parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	router.calculateRoute(routingParameters, onResult, function (error) {
		alert(error.message);
	});
}