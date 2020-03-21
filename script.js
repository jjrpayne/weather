var units = 'metric';
var searchMethod = 'q';
var appId = ''; // insert api key here 
     
function searchWeather(searchTerm){
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&units=${units}&appid=${appId}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}
	
function init(resultFromServer){
	console.log(resultFromServer);
	switch(resultFromServer.weather[0].main){
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("storm.jpg")';
			break;
		case 'Drizzle':
		case 'Rain':
		case 'Mist':
			document.body.style.backgroundImage = 'url("rain.jpg")';
			break;
		case 'Snow':
			document.body.style.backgroundImage = 'url("snow.jpg")';
			break;
		case 'Clear':
			document.body.style.backgroundImage = 'url("clear.jpg")';
			break;
		case 'Clouds':
			document.body.style.backgroundImage = 'url("cloudy.jpg")';
			break;

		default:
			break;
	}
	var weatherContainer = document.getElementById('weatherContainer');
	var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	var temperatureElement = document.getElementById('temperature');
	var humidityElement = document.getElementById('humidity');
	var windSpeedElement = document.getElementById('windSpeed');
	var cityHeader = document.getElementById('cityHeader');
	var weatherIcon = document.getElementById('documentIconImg');

	weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

	var resultDescription = resultFromServer.weather[0].description;

	weatherDescriptionHeader.innerText = resultDescription = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
	temperatureElement.innerHTML = Math.round(resultFromServer.main.temp) + '°C';
	windSpeedElement.innerHTML = 'Wind at ' + Math.round(resultFromServer.wind.speed) + 'm/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
	
	setPositionForWeatherInfo();
}

function search(){
	var searchTerm = document.getElementById('searchInput').value;
	if(searchTerm)
		searchWeather(searchTerm);
}

function setPositionForWeatherInfo(){
	var weatherContainer = document.getElementById('weatherContainer');
	var weatherContainerHeight = weatherContainer.clientHeight;
	var weatherContainerWidth = weatherContainer.clientWidth;
	
	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
	weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('searchInput').addEventListener('keyup', (event) => {
	if (event.keyCode === 13) {
		document.getElementById('searchBtn').click();
	}
});
