const apiKey = "bfe18db51ee07b21dea66dce855c440b";
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const Url = "https://api.openweathermap.org/data/2.5/weather?"

async function getCordinates(loc){
    try{

        let response = await fetch(apiUrl+loc+`&appid=${apiKey}`);
        let data = await response.json()
        
        if(data.length === 0){
            console.error("Invalid City Name")
        }
        else{
            return{lat:data[0].lat, lon:data[0].lon}
        }
        
    }catch(error){
        console.error("Error")
    }
}

async function weather(lat,lon) {
    let answer = await fetch(`${Url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    let info = await answer.json();
    
    document.querySelector(".temp").innerHTML = Math.round(info.main.temp)+"°C"
    document.querySelector(".city").innerHTML = document.querySelector(".search input").value.trim().toString().toUpperCase();
    document.querySelector(".humid").innerHTML = info.main.humidity;
    document.querySelector(".speed").innerHTML = Math.round(info.wind.speed) + " km/hr";
    
    console.log(info.weather[0].main);
    
    if(info.weather[0].main == "Clear"){
        document.querySelector(".weather_condn img").src = "clear.png"
    }
    else if(info.weather[0].main == "Clouds"){
        document.querySelector(".weather_condn img").src = "clouds.png"
    }
    else if(info.weather[0].main == "Rain"){
        document.querySelector(".weather_condn img").src = "rain.png"
    }
    else if(info.weather[0].main == "Drizzle"){
        document.querySelector(".weather_condn img").src = "drizzle.png"
    }
    else if(info.weather[0].main == "Mist"){
        document.querySelector(".weather_condn img").src = "mist.png"
    }
    else if(info.weather[0].main == "Snow"){
        document.querySelector(".weather_condn img").src = "snow.png"
    }
    document.querySelector(".section").style.display = "block";
}


let btn = document.querySelector(".search button");
btn.addEventListener("click",async ()=>{
    let cordinates = await getCordinates(document.querySelector(".search input").value.trim())
    if(cordinates){
        weather(cordinates.lat,cordinates.lon);
    }
})