window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureTimezone = document.querySelector(".location-timezone");
    let canvas = document.querySelector(".canvas");

    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=95b2713369b16becc9909d233b761850`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const zone = data.name;
                    const description = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    console.log(icon);
                    //Set DOM elements from the API
                    temperatureDegree.textContent = Math.round(temp-273.15);
                    temperatureTimezone.textContent = zone;
                    temperatureDescription.textContent = description;
                    //Set Icon
                    context = canvas.getContext('2d');
                    make_base();

                    function make_base(){
                        base_image = new Image();
                        base_image.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
                        base_image.onload = function(){
                            context.drawImage(base_image, 0, 0);
                            }
                    }

                    function toFixedIfNecessary( value, dp ){
                        return +parseFloat(value).toFixed( dp );
                      }
                      
                });
        });


    }

    else{
        h1.textContent = 'Non funziona la Geolocalizzazione'
    }
});