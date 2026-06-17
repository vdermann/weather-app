import '../css/style.css';
import buildTodaysForecast from './ui/todaysForecast';
import buildWeeklyForecast from './ui/weeklyForecast';

const body = document.querySelector('body');
const page = document.querySelector('.page');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const API_KEY = 'EZ9QJEDZHD5ARFB3U3Z8U3WBV';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Async function to get the data of the weather.
async function getWeatherData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

// Listener.
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = input.value;
  const url = `${BASE_URL}${location}/next8days?key=${API_KEY}`;
  const data = await getWeatherData(url);

  const { currentConditions, days, description } = data;
  const nextSevenDays = days.slice(1, 8);

  page.append(
    await buildTodaysForecast(location, currentConditions, description),
    await buildWeeklyForecast(nextSevenDays)
  );
  body.append(page);
});
