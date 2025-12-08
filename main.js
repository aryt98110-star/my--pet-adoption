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
// 1) تعریف تابع async برای Pets Area
async function petsArea() {   // یک تابع ناهمزمان (async) می‌سازیم تا بتوانیم با await داده‌ها را از اینترنت بخوانیم


  // 2) درخواست به URL داده‌ها
  const petsPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
  // با fetch از مرورگر درخواست می‌زنیم تا فایل JSON حیوانات را از URL بگیرد
  // چون fetch یک Promise برمی‌گرداند، از await استفاده می‌کنیم تا منتظر جواب بمانیم


  // 3) تبدیل پاسخ به داده‌های JSON
  const petsData = await petsPromise.json()
  // داده‌ی خام (Response) را به فرمت JSON (یعنی آرایه/آبجکت قابل استفاده در JS) تبدیل می‌کنیم


  // 4) بررسی داده‌ها در کنسول
  console.log(petsData)
  // چاپ کل داده‌ها در کنسول مرورگر برای مطمئن شدن از اینکه همه چیز درست آمده


  // 5) انجام عملیاتی روی تک تک حیوانات
  petsData.forEach(pet => {
    // forEach روی آرایه اجرا می‌شود و یکبار برای هر حیوان این تابع را صدا می‌زند
    // پارامتر pet همان حیوان فعلی در لیست است

    console.log(pet.name)
    // نام هر حیوان را در کنسول چاپ می‌کنیم
    // این نشان می‌دهد که داده‌ها را می‌توانیم جدا جدا استفاده کنیم (مثل name یا species یا ...)

  })

} // پایان تابع petsArea


// 6) صدا زدن تابع
petsArea()
// در نهایت تابع را فراخوانی می‌کنیم تا همه‌ی مراحل اجرا شوند

