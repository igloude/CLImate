#!/usr/bin/env node

var https 	  = require("https"),
	cities    = require("cities"),
	prompt    = require("prompt");

prompt.start();

function evaluatePrompt() {
	prompt.get(['zipcode'], function(err, result) {
		var zip = result.zipcode;
		var city = cities.zip_lookup(zip);

		if ( city != null ) {
			requester(zip, city.latitude, city.longitude);
		} else {
			restart();
		}
	});
}

function restart() {
	console.log("Please enter a valid zip code.")
	console.log("");
	evaluatePrompt();
}

function printer(data, zip) {
	console.log("");
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
	console.log("Precipitation: " + Math.round(data.daily.data[0].precipProbability * 100) + "%");
	console.log("");
}

function requester(zip, latitude, longitude) {
	var request = https.get('https://api.forecast.io/forecast/2a65c574d33b0f4ea0c5dda6b777c91c/' + latitude + ',' + longitude, function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if (response.statusCode === 200) {
				try	{
					var data = JSON.parse(body);
					printer(data, zip);
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

evaluatePrompt();
