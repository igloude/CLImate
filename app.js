var http = require("https");

var latitude = process.argv.slice(2, 3);
var longitude = process.argv.slice(3, 4);

function weather(latitude, longitude) {
	var request = http.get('https://api.forecast.io/forecast/2a65c574d33b0f4ea0c5dda6b777c91c/' + latitude + ',' + longitude, function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if (response.statusCode === 200) {
				try	{
					// set up vars
					var data = JSON.parse(body);
					var hum;
					if (data.currently.humidity <= 33) {hum = "low";} else if (data.currently.humidity >= 66) {hum = "high";} else {hum = "average";}

					// print to console
					console.log("Latitude [" + latitude + "]    Longitude [" + longitude + "]");
					console.log("Here's your weather report for " + data.timezone + ":");
					console.log("It is currently " + data.currently.summary.toLowerCase() + " with " + hum + " humidity.");
					console.log("The temperature is " + data.currently.temperature + "F and feels like " + data.currently.apparentTemperature + "F");
					console.log("Chance of precipitation: " + data.currently.precipProbability + "%");
				} catch(error) {
					console.error(error.message);
				}
			} else {
				console.error("Oh no! Error.");
			}
		});
	});
	request.on("error", function(error) {
		console.error(error.message);
	});
}

weather(latitude, longitude);