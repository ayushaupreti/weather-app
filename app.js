// on page load, get location
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureIcon = document.querySelector('.temperature-icon')
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span')

    // this will prompt in browser allow geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=94e905321fb64075bf402209222401&q=${long, lat}`

            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                // console.log(data)
                const timezone = data.location.tz_id;
                // const country = data.location.country;
                const temperature_f = data.current.temp_f;
                const temperature_c = data.current.temp_c;
                const condition = data.current.condition.text;
                const icon = data.current.condition.icon;

                // set DOM elements from the api
                temperatureDegree.textContent = temperature_f;
                temperatureDescription.textContent = condition;
                locationTimezone.textContent = timezone;
                temperatureIcon.src = icon;
                
                // change temp to c/f on click
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = "C"
                        temperatureDegree.textContent = temperature_c;
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature_f;
                    }
                })
            })
        });
    }
})

