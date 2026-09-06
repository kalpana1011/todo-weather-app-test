export const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) {
    return "☀️";
  }

  if (weatherCode <= 3) {
    return "⛅";
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return "🌫️";
  }

  if (weatherCode >= 51 && weatherCode <= 67) {
    return "🌧️";
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return "🌨️";
  }

  if (weatherCode >= 80 && weatherCode <= 82) {
    return "🌦️";
  }

  if (weatherCode >= 85 && weatherCode <= 86) {
    return "🌨️";
  }

  return "⛈️";
};

export const getClothingAdvice = (temperature, weatherCode) => {
  let advice = "Ta på dig lätta kläder.";

  if (temperature < 5) {
    advice = "Ta på dig en varm jacka, mössa och handskar.";
  } else if (temperature < 15) {
    advice = "Ta på dig en jacka eller varm tröja.";
  } else if (temperature < 20) {
    advice = "En tunn jacka eller tröja kan vara bra.";
  }

  const isRainy = weatherCode >= 51 && weatherCode <= 82;

  if (isRainy) {
    advice += " Ta även med ett paraply.";
  }

  return advice;
};
