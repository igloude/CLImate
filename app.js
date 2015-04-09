var http = require("https");
var cities = require("cities");

var zip = process.argv.slice(2);

function printer(cities, data) {
	console.log("________________________________________________");
	console.log("");
	console.log("   0   0  0000  0000  00000  0  0  0000  0000   ");
	console.log("   0   0  0     0  0    0    0  0  0     0  0   ");
	console.log("   0 0 0  0000  0000    0    0000  0000  0000   ");
	console.log("   0 0 0  0     0  0    0    0  0  0     0 0    ");
	console.log("   00000  0000  0  0    0    0  0  0000  0  0   ");
	console.log("________________________________________________");
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
	console.log("Precipitation: " + (data.daily.data[0].precipProbability * 100) + "%");
}

function weather(zip) {
	var latitude = cities.zip_lookup(zip).latitude;
	var longitude = cities.zip_lookup(zip).longitude;

	var request = http.get('https://api.forecast.io/forecast/2a65c574d33b0f4ea0c5dda6b777c91c/' + latitude + ',' + longitude, function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if (response.statusCode === 200) {
				try	{
					var data = JSON.parse(body);
					printer(cities, data);
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

weather(zip);
