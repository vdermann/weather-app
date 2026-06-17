import '../css/style.css';
import buildTodaysForecast from './ui/todaysForecast';
import buildWeeklyForecast from './ui/weeklyForecast';

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
function buildPage() {
  const body = document.querySelector('body');
  const app = document.createElement('div');
  const main = document.createElement('main');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  app.classList.add('app');
  main.classList.add('main');
  form.classList.add('form');
  input.classList.add('form__input');
  button.classList.add('form__button');

  input.type = 'text';
  input.placeholder =
    'Search for a location or city... (e.g Tokyo, Dublin, Montevideo)';
  button.textContent = 'Search';
  button.type = 'submit';

  form.append(input, button);
  app.append(form, main);
  body.append(app);

  return { form, input, main };
}

// Reset
function reset(section) {
  const page = section;
  page.innerHTML = '';
}

// Init.
function init() {
  const { form, input, main } = buildPage();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    reset(main);

    const location = input.value.trim();
    if (!location) return;

    const url = `${BASE_URL}${location}/next8days?key=${API_KEY}`;
    const data = await getWeatherData(url);

    const { currentConditions, days, description } = data;
    const nextSevenDays = days.slice(1, 8);

    main.append(
      await buildTodaysForecast(location, currentConditions, description),
      await buildWeeklyForecast(nextSevenDays)
    );
  });
}

init();
