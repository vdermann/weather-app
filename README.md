# Weather App

A vanilla JavaScript weather application that fetches real-time forecast data using the [Visual Crossing Weather API](https://www.visualcrossing.com/). Built as a hands-on exercise in API consumption, async JavaScript, and DOM manipulation.

![Weather App](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript) ![Webpack](https://img.shields.io/badge/Webpack-5-blue?logo=webpack) ![ESLint](https://img.shields.io/badge/ESLint-Airbnb-purple?logo=eslint)

---

## Features

- Search weather by city or location
- Displays current conditions: temperature, feels like, humidity, wind speed, UV index, sunrise and sunset
- 7-day forecast with daily high/low temperatures
- Toggle between **Fahrenheit** and **Celsius**
- Dynamic SVG icons loaded on demand via **dynamic imports**
- Loading indicator during API requests
- Error handling for invalid or unrecognized locations

---

## Tech Stack

- **Vanilla JavaScript (ES6+)**
- **Webpack** — bundling, with separate dev/prod configs
- **ESLint** — Airbnb style guide
- **Prettier** — code formatting
- **Visual Crossing Weather API**

---

## Project Structure

```
weather-app/
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── ui/
│       │   ├── icons/          # SVG icon files + dynamic loader
│       │   ├── todaysForecast.js
│       │   └── weeklyForecast.js
│       ├── utils/
│       │   └── temperature.js  # Unit conversion utility
│       └── index.js            # Entry point, init, event listeners
├── template.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── .eslintconfig.js
├── .prettierrc
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/vdermann/weather-app.git
cd weather-app
npm install
```

### API Key

This project uses the [Visual Crossing Weather API](https://www.visualcrossing.com/). Get a free API key and add it to `src/js/index.js`:

```js
const API_KEY = 'YOUR_API_KEY_HERE';
```

> **Note:** For a production project, store the key in a `.env` file and access it via `process.env`. Never commit API keys to version control.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## License

MIT
