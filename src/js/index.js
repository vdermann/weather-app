import '../css/style.css';
import loadIcon from './ui/icons';
import buildTodaysForecast from './ui/todaysForecast';
import buildWeeklyForecast from './ui/weeklyForecast';

let currentUnit = 'F';
let cachedData = null;
const API_KEY = 'EZ9QJEDZHD5ARFB3U3Z8U3WBV';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Fetch data.
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

// Building the initial UI.
async function buildPage() {
  const body = document.querySelector('body');
  const app = document.createElement('div');
  const main = document.createElement('main');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const toggleBtn = document.createElement('button');

  app.classList.add('app');
  main.classList.add('main');
  form.classList.add('form');
  input.classList.add('form__input');
  button.classList.add('form__button');
  toggleBtn.classList.add('form__toggle');

  input.type = 'text';
  input.placeholder =
    'Search for a location or city... (e.g Tokyo, Dublin, Montevideo)';
  button.innerHTML = `${await loadIcon('search')} Search`;
  button.type = 'submit';
  toggleBtn.type = 'button';
  toggleBtn.textContent = '°C / °F';

  form.append(input, button, toggleBtn);
  app.append(form, main);
  body.append(app);

  return { form, input, main, toggleBtn };
}

// Reset
function reset(section) {
  const page = section;
  page.innerHTML = '';
}

async function render(main, data, unit) {
  reset(main);
  const { address, currentConditions, days, description } = data;
  const nextSevenDays = days.slice(1, 8);

  main.append(
    await buildTodaysForecast(address, currentConditions, description, unit),
    await buildWeeklyForecast(nextSevenDays, unit)
  );
}

// Init.
async function init() {
  const { form, input, main, toggleBtn } = await buildPage();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = input.value.trim();
    if (!location) return;

    const url = `${BASE_URL}${location}/next8days?key=${API_KEY}`;
    const data = await getWeatherData(url);

    cachedData = { ...data };
    console.log(cachedData);

    await render(main, cachedData, currentUnit);
  });

  toggleBtn.addEventListener('click', async () => {
    if (!cachedData) return;
    currentUnit = currentUnit === 'F' ? 'C' : 'F';
    await render(main, cachedData, currentUnit);
  });
}

await init();
