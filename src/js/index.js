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
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Location not found, try writing a city or location (HTTP Error, Status: ${response.status}).`
    );
  }
  const data = await response.json();
  return data;
}

// Reset
function reset(section) {
  const page = section;
  page.innerHTML = '';
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
  const footer = document.createElement('footer');

  app.classList.add('app');
  main.classList.add('main');
  form.classList.add('form');
  input.classList.add('form__input');
  button.classList.add('form__button');
  toggleBtn.classList.add('form__toggle');
  footer.classList.add('footer');

  input.type = 'text';
  input.placeholder =
    'Search for a location or city... (e.g Tokyo, Dublin, Montevideo)';
  button.innerHTML = `${await loadIcon('search')} Search`;
  button.type = 'submit';
  toggleBtn.type = 'button';
  toggleBtn.textContent = '°C / °F';

  footer.innerHTML = `Built by <a href="https://github.com/vdermann" target="_blank">Deihva</a> · Data from <a href="https://www.visualcrossing.com/" target="_blank">Visual Crossing</a>`;

  form.append(input, button, toggleBtn);
  app.append(form, main);
  body.append(app, footer);

  return { form, input, main, toggleBtn };
}

// In case of an Error.
function showErrorMessage(container, message) {
  reset(container);
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = message;
  container.append(errorDiv);
}

// Loading Animation while waiting for the API response.
function showLoader(container) {
  reset(container);
  const loader = document.createElement('div');
  loader.classList.add('loader');
  container.append(loader);
}

// Render.
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
    showLoader(main);

    try {
      const data = await getWeatherData(url);
      cachedData = { ...data };
      await render(main, cachedData, currentUnit);
      input.value = '';
    } catch (error) {
      showErrorMessage(main, error.message);
      cachedData = null;
      input.value = '';
    }
  });

  toggleBtn.addEventListener('click', async () => {
    if (!cachedData) return;
    currentUnit = currentUnit === 'F' ? 'C' : 'F';
    await render(main, cachedData, currentUnit);
  });
}

await init();
