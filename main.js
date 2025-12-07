async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const ourTemprature = weatherData.properties.periods[0].temprature
  document.querySelector("#temperature-output").textContent = ourTemprature

}
start()