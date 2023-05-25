
const searchButton = document.querySelector('.search button');


searchButton.addEventListener('click', function() {

	const cityname = document.getElementById('city').value;
	console.log(cityname);
	
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityname}`;
	
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a50b704c3msh15828e220fd9791p19f493jsnbb7d80ef0c74',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

try {
	fetch(url, options)
	  .then(response => response.json())
	  .then(data => {
		console.log(data);
  
		city_name.innerHTML = cityname;
		region.innerHTML = data.location.region;
		country.innerHTML = data.location.country;
		document.getElementById('temp_c').innerHTML = data.current.temp_c;
		document.getElementById('feelslike_c').innerHTML = data.current.feelslike_c;
		document.getElementById('wind_kph').innerHTML = data.current.wind_kph;
		document.getElementById('humidity').innerHTML = data.current.humidity;
		document.getElementById('cloud').innerHTML = data.current.cloud;


		if (data.current.temp_c>=40)
			document.getElementById('img').src = "./weather-logos/perspective_matte-169-128x128.png";
		else if (data.current.temp_c <=20 && data.current.wind_kph >= 50)
			document.getElementById('img').src = "./weather-logos/Breeze-128x128.png";
		else if (data.current.temp_c <=20)
			document.getElementById('img').src = "./weather-logos/perspective_matte-223-128x128.png";
		else if (data.current.cloud >=100)
			document.getElementById('img').src = "./weather-logos/perspective_matte-210-128x128.png";
		else if (data.current.precip_mm > 0)
			document.getElementById('img').src = "./weather-logos/Rain_perspective_matte-128x128.png";
		else if (data.current.wind_kph >= 50)
			document.getElementById('img').src = "./weather-logos/perspective_matte-146-128x128.png";
		else
			document.getElementById('img').src = "./weather-logos/perspective_matte-221-128x128.png";
		

  });
  } catch (error) {
	alert(error);
  }
  
});

