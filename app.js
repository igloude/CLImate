#!/usr/bin/env node

var https 	  = require("https"),
	cities    = require("cities"),
	prompt    = require("prompt");

prompt.start();

var schema = {
	properties: {
		zipcode: {
			description: 'Enter a zipcode',
			type: 'number'
		}
	}
}

prompt.get(schema, function(err, result) {

	var zip = result.zipcode;
	weather(zip);

});

function printer(data) {
	console.log("");
	// console.log("");
	console.log(cities.zip_lookup(zip).city + ", " + cities.zip_lookup(zip).state_abbr + " " + zip);
	console.log("");
	console.log("Currently:");
	console.log("----------------");
	console.log(data.currently.summary + " and " + data.currently.temperature + "\u00b0F");
	console.log("Feels like " + data.currently.apparentTemperature + "\u00b0F");
	console.log("Humidity: " + data.currently.humidity);
	console.log("Wind: " + data.currently.windSpeed + " bearing \u00b0" + data.currently.windBearing);
	console.log("");
	console.log(data.daily.summary);
	console.log("");
	console.log("Tomorrow:");
	console.log("----------------");
	console.log("High: " + data.daily.data[0].temperatureMax + "\u00b0F");
	console.log("Low: " + data.daily.data[0].temperatureMin + "\u00b0F");
	console.log("Precipitation: " + (data.daily.data[0].precipProbability * 100) + "%");
	console.log("");
}

function weather(zip) {
	var latitude = cities.zip_lookup(zip).latitude;
	var longitude = cities.zip_lookup(zip).longitude;

	var request = https.get('https://api.forecast.io/forecast/2a65c574d33b0f4ea0c5dda6b777c91c/' + latitude + ',' + longitude, function(response) {

		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if (response.statusCode === 200) {
				try	{
					var data = JSON.parse(body);
					printer(data);
				} catch(error) {
					console.error(error.message);
				}
			} else {
				console.error("Oh no! Error " + response.statusCode);
			}
		});
	});
	request.on("error", function(error) {
		console.error(error.message);
	});
}
