
export const getWeatherIcon = (weatherCode: number, isDay: number): string => {
  const isDayBool = isDay === 1;
  const basePath = "/icons"; 

  switch (weatherCode) {
    // despejado
    case 0:
      return `${basePath}/${isDayBool ? "clear-day.svg" : "clear-night.svg"}`;

    // parcilamente nublado
    case 1:
    case 2:
      return `${basePath}/${isDayBool ? "partly-cloudy-day.svg" : "partly-cloudy-night.svg"}`;

    // nublado
    case 3:
      return `${basePath}/${isDayBool ? "overcast.svg" : "overcast-night.svg"}`;

    // niebla
    case 45:
    case 48:
      return `${basePath}/${isDayBool ? "fog-day.svg" : "fog-night.svg"}`;

    // llovizna
    case 51:
    case 53:
    case 55:
      return `${basePath}/drizzle.svg`;

    // lluvia
    case 61:
    case 63:
    case 65:
      return `${basePath}/rain.svg`;

    // lluvia helada
    case 66:
    case 67:
      return `${basePath}/sleet.svg`;

    // nieve
    case 71: case 73: case 75: 
    case 77: 
    case 85: case 86:
      return `${basePath}/snow.svg`;

    // chubascos
    case 80:
    case 81:
    case 82:
      return `${basePath}/${isDayBool ? "partly-cloudy-day-rain.svg" : "partly-cloudy-night-rain.svg"}`;

    // tormenta
    case 95:
    case 96:
    case 99:
      return `${basePath}/${isDayBool ? "thunderstorms-day-rain.svg" : "thunderstorms-night-rain.svg"}`;

    // default
    default:
      return `${basePath}/clear-day.svg`;
  }
};