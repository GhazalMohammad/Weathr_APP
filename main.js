// varibal today
let date_today = document.getElementById('date_today');
let date_number = document.getElementById('date_number');
let date_month = document.getElementById('date_month');
let city = document.getElementById('city');
let today_temp = document.getElementById('today_temp');
let today_condition_img = document.getElementById('today_condition_img');
let today_condition_text = document.getElementById('today_condition_text');
let humidity = document.getElementById('humidity');
let km = document.getElementById('km');
let esat = document.getElementById('esat');
// ----------------------------------------------
// nextDay
let next_day = document.getElementsByClassName('next_day');
let sec_img = document.getElementsByClassName('sec_img');
let sec_degree = document.getElementsByClassName('sec_degree');
let sec2_degree = document.getElementsByClassName('sec2_degree');
let sec_condition_text = document.getElementsByClassName('sec_condition_text');
// therDay
let ther_day = document.getElementById('ther_day');
let thre_degree = document.getElementById('thre_degree');
let thre2_degree =document.getElementById('thre2_degree');
let thre_condition_text =document.getElementById('thre_condition_text');
// -----------------------------------------------
// search
let search = document.getElementById('search');
// -------------------------------------------------------------------------
// -----------------------------------------
// Fetch API Data 
async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ae3f9701da2e4253a08190609241001&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


// display Today data
 function displayTodayData(data) {
    let todayDate = new Date();
    date_today.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"});
    date_number.innerHTML = todayDate.getDate();
    date_month.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});
    city.innerHTML = data.location.name;
    today_temp.innerHTML = data.current.temp_c;
    today_condition_img.setAttribute('src','//cdn.weatherapi.com/weather/64x64/night/113.png');
    today_condition_text.innerHTML =data.current.condition.text;
    humidity.innerHTML = data.current.humidity;
    km.innerHTML = data.current.wind_kph;
    esat.innerHTML = data.current.wind_dir
 }
// display next days data 
function displayNextData(data){
    let forecastData = data.forecast.forecastday
    console.log(sec_degree);
    for(let i=0; i<2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);
        next_day[i].innerHTML = nextDate.toLocaleString("en-US",{weekday:"long"})
        sec_degree[i].innerHTML = forecastData[i + 1].day.maxtemp_c; 
        sec2_degree[i].innerHTML = forecastData[i + 1].day.mintemp_c; 
        sec_condition_text[i].innerHTML = forecastData[i + 1].day.condition.text;
        sec_img[i].setAttribute('src',forecastData[i+1].day.condition.icon)
    }
}
// start app
 async function startApp(city='cairo'){
    let weatherData = await getWeatherData(city);
   if(!weatherData.error){
    displayTodayData(weatherData);
    displayNextData(weatherData);
   }
 }
 startApp();
 search.addEventListener("input",function(){
    startApp(search.value)
 })