import convertTemp from '../utils/temperature';
import loadIcon from './icons';

function createMetricCard(label, value) {
  const card = document.createElement('div');
  card.classList.add('metric-card');
  const labelDiv = document.createElement('div');
  const valueDiv = document.createElement('div');
  labelDiv.classList.add('metric-card__label');
  valueDiv.classList.add('metric-card__value');

  if (label !== 'Feels like' && label !== 'Conditions') {
    card.classList.add('metric-card--secondary');
  }

  labelDiv.textContent = label;
  valueDiv.textContent = value;
  card.append(labelDiv, valueDiv);

  return card;
}

async function buildTodaysForecast(location, data, description, currentUnit) {
  const {
    temp,
    feelslike,
    conditions,
    icon,
    humidity,
    windspeed,
    uvindex,
    sunrise,
    sunset,
  } = data;

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
  // Getting today's date.
  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en', options);

  // First Row: for the location name and the current date.
  const infoRow = document.createElement('div');
  const cityNameDiv = document.createElement('div');
  const currentDateDiv = document.createElement('div');
  cityNameDiv.classList.add('current__city');
  currentDateDiv.classList.add('current__date');
  cityNameDiv.textContent = location;
  currentDateDiv.textContent =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
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
  mainIcon.innerHTML = await loadIcon(icon);
  currentTempDiv.textContent = `${convertTemp(temp, currentUnit)}°${currentUnit}`;
  currentCondDiv.textContent = conditions;
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
    createMetricCard(
      'Feels like',
      `${convertTemp(feelslike, currentUnit)}°${currentUnit}`
    ),
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

export default buildTodaysForecast;
