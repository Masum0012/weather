const api_key = '60310694e2c31da949516a010627ce7c'
const api_url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon') 



async function checkWeather (city){
    const response = await fetch(api_url + city + `&appid=${api_key}`)
    const data = await response.json()

    if(response.status === 404){
        document.querySelector('.error').style.display = 'block'

        setTimeout(() => {
            document.querySelector('.error').style.display = 'none'
        }, 3000)



    } else {

        // displayWeatherData(data)

    
    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round (data.main.temp)  + '°C' 
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'


    if(data.weather[0].main === 'Clouds'){
        weatherIcon.src = 'images/clouds.png'
    }
    else if(data.weather[0].main === 'Clear'){
        weatherIcon.src = 'images/clear.png'
    }

    else if (data.weather[0].main === 'Rain'){
        weatherIcon.src = 'images/rain.png'
    }

    else if(data.weather[0].main === 'Drizzle'){
        weatherIcon.src = 'images/drizzle.png'
    }

    else if (data.weather[0].main === 'Mist'){
        weatherIcon.src = 'images/mist.png'
    }


    document.querySelector('.weather').style.display = 'block'
         
    }
}


function showWeatherByLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude } = position.coords
                const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`)
                const data = await response.json()
                if(response.status === 404){
                    checkWeather('Sylhet')
                } else {
                    displayWeatherData(data)
                }
            },
            (error) => {
                checkWeather('Sylhet')
            }
        )
    }  else{
        checkWeather('Sylhet')
    }
}











function displayWeatherData(data){


    
    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round (data.main.temp)  + '°C' 
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'


    if(data.weather[0].main === 'Clouds'){
        weatherIcon.src = 'images/clouds.png'
    }
    else if(data.weather[0].main === 'Clear'){
        weatherIcon.src = 'images/clear.png'
    }

    else if (data.weather[0].main === 'Rain'){
        weatherIcon.src = 'images/rain.png'
    }

    else if(data.weather[0].main === 'Drizzle'){
        weatherIcon.src = 'images/drizzle.png'
    }

    else if (data.weather[0].main === 'Mist'){
        weatherIcon.src = 'images/mist.png'
    }


    document.querySelector('.weather').style.display = 'block'
         

}



searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
})

checkWeather('Dhaka')

showWeatherByLocation()



