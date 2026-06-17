export default function convertTemp(temp, unit) {
  if (unit === 'C') return (((temp - 32) * 5) / 9).toFixed(1);
  return Number(temp).toFixed(1);
}
