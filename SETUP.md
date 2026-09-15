# Weather Dashboard - Setup & Usage Guide

## 🌤️ Features

✨ **Current Weather Display**
- Real-time weather data for any city worldwide
- Temperature, weather conditions, and "feels like" temperature
- Min/Max temperatures with detailed metrics
- Animated weather icons with descriptions
- City name and country code
- Current date and time

📊 **5-Day Forecast**
- Daily weather forecasts for the next 5 days
- Temperature trends and weather conditions
- Beautiful card-based responsive layout
- Easy-to-read format with dates

📈 **Detailed Metrics Dashboard**
- 💧 Humidity levels
- 💨 Wind speed (m/s)
- 👁️ Visibility distance (km)
- 🔽 Atmospheric pressure (hPa)
- 🌡️ Feels like temperature
- ☀️ UV Index indicator

🎨 **Modern & Responsive UI**
- Dark mode design with gradient backgrounds
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Font Awesome 6.4 icons
- Beautiful hover effects
- Professional color scheme

⚡ **User-Friendly Interface**
- Search any city worldwide
- Real-time error handling
- Loading states
- Instant weather updates
- Keyboard support (Enter to search)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Weather API**: OpenWeatherMap Free API
- **Icons**: Font Awesome 6.4
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **No dependencies required** - Pure vanilla implementation

## 🚀 How to Use

### Option 1: Direct Browser (Recommended)

1. Clone or download this repository
2. Open `index.html` directly in your web browser
3. The dashboard loads with London weather by default
4. Use the search box to look up weather for any city
5. Press `Enter` or click the Search button

### Option 2: Local Development Server

```bash
# Using Python 3.x
python -m http.server 8000

# OR using Python 2.x
python -m SimpleHTTPServer 8000

# OR using Node.js
npx http-server

# OR using Node.js with live-server
npx live-server
```

Then visit `http://localhost:8000`

### Option 3: Deploy Online

- **GitHub Pages**: Push to GitHub and enable Pages in settings
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: `firebase deploy`

## 🔑 API Configuration

The app includes a free OpenWeatherMap API key for testing. For production use:

### Get Your Own Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate your API key from the dashboard
4. Open `script.js` and replace line 1:

```javascript
const API_KEY = 'your-api-key-here';
```

### API Rate Limits (Free Tier)

- **60 API calls/minute**
- **1,000,000 calls/month**
- **Current Weather**: ✅ Supported
- **5-Day Forecast**: ✅ Supported
- **UV Index**: Requires paid plan or additional API call
- **Historical Data**: ✅ Available

## 📁 Project Structure

```
weather-dashboard/
├── index.html       # Main HTML file (UI structure)
├── styles.css       # Stylesheet (design & animations)
├── script.js        # JavaScript logic (API calls & interactions)
├── SETUP.md         # Setup guide (this file)
├── README.md        # Project overview
└── .gitignore       # Git configuration
```

## 🎨 Customization Guide

### Change Default City

Edit line 26 in `script.js`:

```javascript
window.addEventListener('load', () => {
    fetchWeather('Tokyo'); // Change 'London' to your city
});
```

### Modify Color Scheme

Edit CSS variables in `styles.css` (lines 1-10):

```css
:root {
    --primary-color: #667eea;      /* Main accent color */
    --secondary-color: #764ba2;    /* Gradient secondary */
    --success-color: #48bb78;
    --warning-color: #ed8936;
    --danger-color: #f56565;
    --bg-primary: #0f172a;         /* Dark background */
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f1f5f9;       /* Main text */
    --text-secondary: #cbd5e1;     /* Secondary text */
    --border-color: #475569;
}
```

### Add Preset City Buttons

Add to `index.html` after the search box:

```html
<div class="preset-cities">
    <button class="preset-btn" onclick="fetchWeather('Paris')">Paris</button>
    <button class="preset-btn" onclick="fetchWeather('Tokyo')">Tokyo</button>
    <button class="preset-btn" onclick="fetchWeather('New York')">New York</button>
    <button class="preset-btn" onclick="fetchWeather('Dubai')">Dubai</button>
</div>
```

Then add CSS styling:

```css
.preset-cities {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.preset-btn {
    padding: 8px 16px;
    background: rgba(102, 126, 234, 0.2);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.preset-btn:hover {
    background: var(--primary-color);
    color: white;
}
```

### Switch to Fahrenheit

Replace `&units=metric` with `&units=imperial` in `script.js`:

```javascript
// Line 50
const currentResponse = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`
);
```

## 🐛 Troubleshooting

### ❌ "City not found" Error
- Double-check city spelling
- Use English city names
- Try full format: `London, UK` or `New York, USA`
- Some small towns may not be in the database

### ❌ API calls not working
- Verify internet connection
- Check if API key is valid and active
- Ensure you haven't exceeded rate limits (60 calls/min)
- Try a different city
- Clear browser cache and reload

### ❌ Styles not loading properly
- Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Ensure `styles.css` is in the same directory as `index.html`
- Check browser console for 404 errors
- Try a different browser

### ❌ Weather data appears as "--"
- Wait for the page to fully load
- Refresh the page
- Try searching for a different city
- Check the error message at the top

## 🌐 Browser Compatibility

| Browser | Support | Min Version |
|---------|---------|-------------|
| Chrome | ✅ Full | 90+ |
| Firefox | ✅ Full | 88+ |
| Safari | ✅ Full | 14+ |
| Edge | ✅ Full | 90+ |
| Mobile Chrome | ✅ Full | Latest |
| Mobile Safari (iOS) | ✅ Full | 14+ |
| Samsung Internet | ✅ Full | 14+ |

## 🚀 Future Enhancements

- [ ] Add hourly weather forecast
- [ ] Implement geolocation auto-detection
- [ ] Multiple city comparison view
- [ ] Weather alerts and warnings
- [ ] Favorites/saved cities feature
- [ ] Progressive Web App (PWA) support
- [ ] Dark/Light theme toggle
- [ ] Weather history and trends
- [ ] Calendar integration
- [ ] Local storage for search history
- [ ] Air quality index (AQI)
- [ ] Pollen count data
- [ ] Precipitation probability
- [ ] Weather maps/radar

## 📝 API Response Examples

### Current Weather
```json
{
  "name": "London",
  "sys": { "country": "GB" },
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "temp_min": 13.1,
    "temp_max": 17.3,
    "humidity": 72,
    "pressure": 1013
  },
  "weather": [{
    "main": "Clouds",
    "description": "overcast clouds"
  }],
  "wind": { "speed": 4.5 },
  "visibility": 10000
}
```

## 📄 License

This project is open source and available under the **MIT License**.

## 🙏 Credits & Attribution

- **Weather Data**: [OpenWeatherMap API](https://openweathermap.org/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Design Inspiration**: Modern dashboard UI patterns
- **Built with**: ❤️ and vanilla JavaScript

## 💬 Support & Feedback

- Found a bug? Create an issue on GitHub
- Have a feature request? Let us know!
- Questions? Check the FAQ section or GitHub Discussions

## 🔗 Useful Links

- [OpenWeatherMap Documentation](https://openweathermap.org/api)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**Made with ❤️ for weather enthusiasts and developers**
