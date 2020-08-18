var platform = new H.service.Platform({
	"app_id": "Ykv6MmZ03OJtiFD4R7Ht"
	, "app_code": "Vt4QTRVwcF2R6HRO2qsGMpOpZJjieecpCsI9MVEWbQk"
});
var geocoder = platform.getGeocodingService();
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position => {
		geocoder.reverseGeocode({
			mode: "retrieveAddresses"
			, maxresults: 1
			, prox: position.coords.latitude + "," + position.coords.longitude
		}, data => {
			alert("The nearest address to your location is:\n" + data.Response.View[0].Result[0].Location.Address.Label);
		}, error => {
			console.error(error);
		});
	});
}
else {
	console.error("Geolocation is not supported by this browser!");
}