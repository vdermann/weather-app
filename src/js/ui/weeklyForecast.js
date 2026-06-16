function getDayName(dateString) {
  // By adding "T00:00:00Z" we ensure that it takes the exact UTC date
  // and does not change the day due to your time zone.
  const date = new Date(`${dateString}T00:00:00Z`);

  const shortName = { weekday: 'short' };
  const dayName = new Intl.DateTimeFormat('en', shortName).format(date);
  return dayName;
}

function createDayCard(data) {
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
  name.textContent = getDayName(datetime);

  // Putting it all together.
  temps.append(maxTempSpan, minTempSpan);
  card.append(name, date, isvg, desc, temps);
  return card;
}

function buildWeeklyForecast(data) {
  const daysArray = data;
  const section = document.createElement('section');
  const forecastGrid = document.createElement('div');
  section.classList.add('forecast');
  forecastGrid.classList.add('forecast__grid');

  const title = document.createElement('h2');

  daysArray.forEach((dayObj) => {
    forecastGrid.append(createDayCard(dayObj));
  });

  section.append(title, forecastGrid);
  return section;
}

export default buildWeeklyForecast;
