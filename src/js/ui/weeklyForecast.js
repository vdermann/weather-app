import loadIcon from './icons';

function getDayName(dateString) {
  // By adding "T00:00:00Z" we ensure that it takes the exact UTC date
  // and does not change the day due to a time zone.
  const date = new Date(`${dateString}T00:00:00Z`);

  const options = { weekday: 'short', timeZone: 'UTC' };
  const dayName = new Intl.DateTimeFormat('en', options).format(date);
  return dayName;
}

function getDate(dateString) {
  // By adding "T00:00:00Z" we ensure that it takes the exact UTC date
  // and does not change the day due to a time zone.
  const date = new Date(`${dateString}T00:00:00Z`);

  const options = { day: 'numeric', month: 'short', timeZone: 'UTC' };
  const formattedDate = new Intl.DateTimeFormat('en', options).format(date);
  return formattedDate;
}

async function createDayCard(data) {
  const { datetime, icon, conditions, tempmax, tempmin } = data;

  // HTML Elements Variables.
  const card = document.createElement('div');
  const name = document.createElement('div');
  const date = document.createElement('div');
  const isvg = document.createElement('div');
  const desc = document.createElement('div');
  const temps = document.createElement('div');
  const maxTempSpan = document.createElement('span');
  const minTempSpan = document.createElement('span');

  // CSS Classes.
  card.classList.add('day-card');
  name.classList.add('day-card__name');
  date.classList.add('day-card__date');
  isvg.classList.add('day-card__icon');
  desc.classList.add('day-card__desc');
  temps.classList.add('day-card__temps');
  maxTempSpan.classList.add('day-card__temp', 'day-card__temp--max');
  minTempSpan.classList.add('day-card__temp', 'day-card__temp--min');

  // Adding the information to the elements.
  isvg.innerHTML = await loadIcon(icon);
  name.textContent = getDayName(datetime);
  date.textContent = getDate(datetime);
  desc.textContent = conditions;
  maxTempSpan.textContent = tempmax;
  minTempSpan.textContent = tempmin;

  // Putting it all together.
  temps.append(maxTempSpan, minTempSpan);
  card.append(name, date, isvg, desc, temps);
  return card;
}

async function buildWeeklyForecast(data) {
  const daysArray = data;
  const section = document.createElement('section');
  const forecastGrid = document.createElement('div');
  section.classList.add('forecast');
  forecastGrid.classList.add('forecast__grid');

  const title = document.createElement('h2');
  title.classList.add('forecast__heading');
  title.textContent = 'Forecast for the next 7 days';

  const cards = await Promise.all(
    daysArray.map((dayObj) => createDayCard(dayObj))
  );
  cards.forEach((card) => forecastGrid.append(card));

  section.append(title, forecastGrid);
  return section;
}

export default buildWeeklyForecast;
