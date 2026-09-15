// Configuration
const API_KEY = 'b6fd43b59e1efd3765bd1c49b00676fb'; // Free OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastGrid = document.getElementById('forecastGrid');
const errorMessage = document.getElementById('errorMessage');
const detailsDiv = document.querySelectorAll('.detail-card p');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Initialize with default city
window.addEventListener('load', () => {
    fetchWeather('London');
});

// Main functions
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
}

async function fetchWeather(city) {
    try {
        clearError();
        showLoading();

        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        // Display results
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        displayAdditionalDetails(currentData);

    } catch (error) {
        showError(error.message);
        console.error('Error fetching weather:', error);
    }
}

function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, visibility } = data;
    const { temp, feels_like, temp_min, temp_max } = main;
    const { main: weatherMain, description, icon } = weather[0];

    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    currentWeatherDiv.innerHTML = `
        <div class="weather-header">
            <div class="city-name">${name}, ${sys.country}</div>
            <div class="date-time">${now.toLocaleDateString('en-US', options)}</div>
        </div>
        <i class="fas fa-cloud-sun weather-icon" style="color: #fbbf24;"></i>
        <div class="temperature">${Math.round(temp)}°C</div>
        <div class="weather-description">${description}</div>
        <div class="weather-range">
            <span>
                <label>Max</label>
                <div>${Math.round(temp_max)}°C</div>
            </span>
            <span>
                <label>Min</label>
                <div>${Math.round(temp_min)}°C</div>
            </span>
            <span>
                <label>Feels Like</label>
                <div>${Math.round(feels_like)}°C</div>
            </span>
        </div>
    `;
}

function displayForecast(data) {
    const forecasts = {};

    // Group forecasts by day
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US');
        if (!forecasts[date]) {
            forecasts[date] = forecast;
        }
    });

    // Display first 5 days
    forecastGrid.innerHTML = '';
    Object.values(forecasts).slice(1, 6).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const dateStr = date.toLocaleDateString('en-US', options);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${dateStr}</div>
            <i class="fas fa-cloud weather-icon"></i>
            <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
            <div class="forecast-desc">${forecast.weather[0].main}</div>
        `;
        forecastGrid.appendChild(card);
    });
}

function displayAdditionalDetails(data) {
    const { main, wind, visibility } = data;
    const { humidity, pressure, feels_like } = main;

    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(wind.speed)} m/s`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('feelsLike').textContent = `${Math.round(feels_like)}°C`;
    document.getElementById('uvIndex').textContent = 'N/A'; // Requires separate API call
}

function showLoading() {
    currentWeatherDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    forecastGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
}

function showError(message) {
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.add('show');
    currentWeatherDiv.innerHTML = '<div class="loading">No weather data available</div>';
    forecastGrid.innerHTML = '';
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}