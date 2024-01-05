

var form = document.querySelector('.search');


form.addEventListener('submit', function (event) {

	event.preventDefault();
	const cityname = document.getElementById('city').value;
	console.log(cityname);

	const key = '119493f0f2eb4f08a7b73328230511';
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityname}&aqi=yes&days=3&alert=yes`;

	try {
		fetch(url)
			.then(response => response.json())
			.then(data => {

				console.log(data);
				output_container.classList.remove('display_none');
				data_not_found.classList.add('display_none');


				//  main-info

				document.getElementById('weatherlogo').src = data.current.condition.icon;
				curr_temp.innerHTML = data.current.temp_c;
				curr_text.innerHTML = data.current.condition.text;
				min.innerHTML = data.forecast.forecastday[0].day.mintemp_c;
				max.innerHTML = data.forecast.forecastday[0].day.maxtemp_c;

				city_name.innerHTML = data.location.name;
				region.innerHTML = data.location.region;
				country.innerHTML = data.location.country;


				// Hourly forecast

				data.forecast.forecastday[0].hour.forEach(hour => {

					const timeWithoutDate = convertTo12HourFormat(hour.time.split(' ')[1]);
					const temp_c = hour.temp_c;

					const forecastElement = document.createElement('div');
					forecastElement.className = 'forecast light-text';

					forecastElement.innerHTML = `<div class="time">${timeWithoutDate}</div>
												<img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="" />
												<div class="temp">${temp_c}<sup>&deg;c</sup></div>`;

					curr_forecast.appendChild(forecastElement);
				});


				// Todays highlights

				feels_like.innerHTML = data.current.feelslike_c;
				humidity.innerHTML = data.current.humidity;
				wind_speed.innerHTML = data.current.wind_kph;
				pressure.innerHTML = data.current.pressure_mb;
				sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
				sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;


				// Air quality Index

				pm2_5.innerHTML = data.current.air_quality.pm2_5;
				pm_10.innerHTML = data.current.air_quality.pm10;
				co.innerHTML = data.current.air_quality.co;
				no2.innerHTML = data.current.air_quality.no2;
				o3.innerHTML = data.current.air_quality.o3;
				so2.innerHTML = data.current.air_quality.so2;


				// tommorows forecast

				data.forecast.forecastday[1].hour.forEach(hour => {

					const timeWithoutDate = convertTo12HourFormat(hour.time.split(' ')[1]);
					const temp_c = hour.temp_c;

					const forecastElement = document.createElement('div');
					forecastElement.className = 'forecast light-text';

					forecastElement.innerHTML = `<div class="time">${timeWithoutDate}</div>
												<img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="" />
												<div class="temp">${temp_c}<sup>&deg;c</sup></div>`;

					tom_forecast.appendChild(forecastElement);
				});


				// Day after tomorrow

				data.forecast.forecastday[0].hour.forEach(hour => {

					const timeWithoutDate = convertTo12HourFormat(hour.time.split(' ')[1]);
					const temp_c = hour.temp_c;

					const forecastElement = document.createElement('div');
					forecastElement.className = 'forecast light-text';

					forecastElement.innerHTML = `<div class="time">${timeWithoutDate}</div>
												<img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="" />
												<div class="temp">${temp_c}<sup>&deg;c</sup></div>`;

					day_after_tomorrow_forecast.appendChild(forecastElement);
				});

				function convertTo12HourFormat(time) {
					const [hours, minutes] = time.split(':');
					const period = hours >= 12 ? 'PM' : 'AM';
					const hours12 = hours % 12 || 12; // Convert 0 to 12
					return `${hours12}:${minutes} ${period}`;
				}

			});
	} catch (error) {
		alert(error);
	}

});

