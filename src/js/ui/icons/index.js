const VALID_ICONS = new Set([
  // Conditions
  'clear-day',
  'clear-night',
  'rain',
  'snow',
  'sleet',
  'wind',
  'fog',
  'cloudy',
  'partly-cloudy-day',
  'partly-cloudy-night',
  'thunder',
  'thunder-rain',
  // Others
  'search',
  'calendar',
]);

// Fallback in case the API returns an unexpected value.
const FALLBACK_ICON = 'cloudy';

export default async function loadIcon(iconName) {
  const name = VALID_ICONS.has(iconName) ? iconName : FALLBACK_ICON;

  try {
    // Dynamic import, Webpack generates a separate chunk for each SVG.
    const module = await import(`./${name}.svg`);
    return module.default;
  } catch {
    const fallback = await import(`./${FALLBACK_ICON}.svg`);
    return fallback.default;
  }
}
