document.addEventListener("DOMContentLoaded", () => {
    const show = document.getElementById("show");
    const search = document.getElementById("search");
    const cityVal = document.getElementById("city");

    const key = "f79cf6968888bcb4cb45049fa3f6ddb1";    // i use open weather API
    
    const getWeather = () => {
        const cityValue = cityVal.value;
        if (cityValue.length === 0) {
            show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
        } else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
            cityVal.value = "";
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.cod === "404") {
                        show.innerHTML = `<h3 class="error">City not found</h3>`;
                    } else {
                        show.innerHTML = `
                            <h2>${data.name}, ${data.sys.country}</h2>
                            <h4 class="weather">${data.weather[0].main}</h4>
                            <h4 class="desc">${data.weather[0].description}</h4>
                            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                            <h1>${data.main.temp} &#176;C</h1>
                            <div class="temp_container">
                                <div>
                                    <h4 class="title">Min</h4>
                                    <h4 class="temp">${data.main.temp_min}&#176;C</h4>
                                </div>
                                <div>
                                    <h4 class="title">Max</h4>
                                    <h4 class="temp">${data.main.temp_max}&#176;C</h4>
                                </div>
                            </div>
                        `;
                    }
                })
                .catch(() => {
                    show.innerHTML = `<h3 class="error">City not found</h3>`;
                });
        }
    };

    search.addEventListener("click", getWeather);
    window.addEventListener("load", getWeather);
});

