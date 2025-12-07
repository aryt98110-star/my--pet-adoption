async function start() {
  // گرفتن داده خام از سرور هواشناسی
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");

  // تبدیل داده خام به شیء JSON قابل استفاده
  const weatherData = await weatherPromise.json();

  // نمایش کل داده در کنسول (برای بررسی)
  console.log(weatherData.properties.periods[0].temperature);

  // دسترسی به دمای فعلی Miami (اولین رکورد در periods)
  const ourTemperature = weatherData.properties.periods[0].temperature;

  // نمایش فقط عدد دما در کنسول
  console.log(ourTemperature);
}

// اجرای تابع
start();
