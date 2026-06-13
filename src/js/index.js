import '../css/style.css';

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

// UI.
function createMetricCard(label, value) {
  const card = document.createElement('div');
  card.classList.add('metric-card');
  const labelDiv = document.createElement('div');
  const valueDiv = document.createElement('div');
  labelDiv.classList.add('metric-card__label');
  valueDiv.classList.add('metric-card__value');

  if (label !== 'Feels like' || label !== 'Conditions') {
    card.classList.add('metric-card--secondary');
  }

  labelDiv.textContent = label;
  valueDiv.textContent = value;
  card.append(labelDiv, valueDiv);

  return card;
}

function buildTodaysForecast(data, description) {
  const {
    temp,
    feelslike,
    conditions,
    humidity,
    windspeed,
    uvindex,
    sunrise,
    sunset,
  } = data;

  console.log(temp);
  console.log(`Description: ${description}`);

  // Main card (Today's Forecast).
  const container = document.createElement('div');
  const leftSideContainer = document.createElement('div');
  const rightSideContainer = document.createElement('div');
  const todaysForecastSection = document.createElement('section');
  container.classList.add('current__layout');
  leftSideContainer.classList.add('current__info');
  rightSideContainer.classList.add('current__metrics');
  todaysForecastSection.classList.add('current');

  // LEFT SIDE.
  // First Row: for the location name and the current date.
  const infoRow = document.createElement('div');
  const cityNameDiv = document.createElement('div');
  const currentDateDiv = document.createElement('div');
  cityNameDiv.classList.add('current__city');
  currentDateDiv.classList.add('current__date');
  infoRow.append(cityNameDiv, currentDateDiv);

  // Second Row: for the temperature, the conditions and the main icon.
  const tempRow = document.createElement('div');
  const mainIcon = document.createElement('div');
  const currentTempDiv = document.createElement('div');
  const currentCondDiv = document.createElement('div');
  const columnWrapper = document.createElement('div');
  mainIcon.classList.add('current__icon');
  currentTempDiv.classList.add('current__temp');
  currentCondDiv.classList.add('current__cond');
  tempRow.classList.add('current__temp-row');
  columnWrapper.append(currentTempDiv, currentCondDiv);
  tempRow.append(mainIcon, columnWrapper);

  // Third Row: just the description.
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add('current__description');
  descriptionParagraph.textContent = description;

  // Left Container.
  leftSideContainer.append(infoRow, tempRow, descriptionParagraph);

  // RIGHT SIDE.
  // First Row: feels like and conditions.
  const primaryMetrics = document.createElement('div');
  primaryMetrics.classList.add('metric-group', 'metric-group--primary');
  primaryMetrics.append(
    createMetricCard('Feels like', feelslike),
    createMetricCard('Conditions', conditions)
  );

  // Second Row: secondary metrics
  const secondaryMetrics = document.createElement('div');
  secondaryMetrics.classList.add('metric-group', 'metric-group--secondary');
  secondaryMetrics.append(
    createMetricCard('Humidity', humidity),
    createMetricCard('Wind', windspeed),
    createMetricCard('UV', uvindex),
    createMetricCard('Sunrise', sunrise),
    createMetricCard('Sunset', sunset)
  );

  // Right Container.
  rightSideContainer.append(primaryMetrics, secondaryMetrics);

  // Putting it all together.
  container.append(leftSideContainer, rightSideContainer);
  todaysForecastSection.append(container);
  return todaysForecastSection;
}

function buildLongForecast() {}

// Listener.
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = input.value;
  console.log(location);

  const url = `${BASE_URL}${location}/next7days?key=${API_KEY}`;
  const data = await getWeatherData(url);

  console.log(data);

  const { currentConditions, days, description } = data;
  const sevenDaysForecast = days.slice(1, 8);

  page.append(buildTodaysForecast(currentConditions, description));
  // buildLongForecast(sevenDaysForecast);
  body.append(page);
});
