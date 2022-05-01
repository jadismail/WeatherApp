const api = {
    key: "7591cf9fedca283a92468b5fd43c073d",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(displayResult);
}

function displayResult(weather) {
    console.log(weather);
    const city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    const date = document.querySelector(".date");
    const today = new Date();
    date.innerHTML = dateBuilder(today);

    const tempElement = document.querySelector(".temp");
    tempElement.innerHTML = `${Math.round(weather.main.temp)}°C`;

    const weatherElement = document.querySelector(".weather");
    weatherElement.innerHTML = `${weather.weather[0].main}`;

    const levelElement = document.querySelector(".level");
    levelElement.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    const weatherIconElement = document.querySelector(".weather-icon");
    weatherIconElement.innerHTML = getWeatherIcon(weather.weather[0].description);
}

function dateBuilder(today) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function getWeatherIcon(weatherEl) {
    switch (weatherEl) {
        case "overcast clouds":
            return `<i class="fa-solid fa-cloud-sun fa-4x"></i>`;

        case "clear sky":
            return `<i class="fa-solid fa-sun fa-4x" style="color: yellow;"></i>`;

        case "broken clouds":
            return `<i class="fa-solid fa-cloud fa-4x"></i>`;

        case "scattered clouds":
            return `<i class="fa-solid fa-cloud fa-4x"></i>`;

        case "few clouds":
            return `<i class="fa-solid fa-cloud fa-4x"></i>`;

            // default:
            //     break;
    }

}