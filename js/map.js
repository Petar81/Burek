function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	}
	else {
		return Promise.reject(new Error(response.statusText))
	}
}

function json(response) {
	return response.json()
}

/* To manage limitations caused by the cross-origin domain sharing (CORS) mechanism

var url = 'https://host/path?CORSH=' + encodeURIComponent(JSON.stringify({
	"Content-Type": "application/vnd.here.layerObjectList+json; charset=utf-8"
	, "Accept": "application/json; charset=UTF-8"
	, "GroupId": "FGx1AWaAzKOo0imNkLmf"
	, "AuthServiceId": "here_app"
	, "Auth-Identifier": "Ykv6MmZ03OJtiFD4R7Ht"
	, "Auth-Secret": "AXqUNisVW46XJs9_pxuzOzneKlYPrY5X_6XgEQ6bw2YXhxAsu5bQifGaWJLL8oe8AyBNjv6i24uU_JcXDas7wg"
}))
*/


fetch('https://pos.ls.hereapi.com/positioning/v1/locate?apiKey=Vt4QTRVwcF2R6HRO2qsGMpOpZJjieecpCsI9MVEWbQk', {
	mode: 'no-cors'
	, method: 'post'
	, headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
	, body: {
		"lte": [{
			"mcc": 262
			, "mnc": 2
			, "cid": 2898945
  			}]
			, "wlan": [
			{
				"mac": "F4-55-95-11-2C-C1"
			}
  			]
			}
	}).then(status)
	.then(json)
	.then(function (data) {
	console.log('Request succeeded with JSON response', data);
	})
	.catch(function (error) {
	console.log('Request failed', error);
	});