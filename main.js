const template = document.querySelector("#pet-card-template");
// توضیح: این خط عنصر <template> با id "pet-card-template" را می‌گیرد.
// ما از این تمپلیت برای ساخت نسخه‌های کلون‌شده کارت‌ها استفاده می‌کنیم.

// 2. ساخت یک DocumentFragment به عنوان واسط (wrapper)
const wrapper = document.createDocumentFragment();
// توضیح: DocumentFragment یک کانتینر موقت است که در DOM رندر نمی‌شود.
// ما کارت‌ها را اول در این fragment اضافه می‌کنیم تا عملکرد سریع‌تر باشد.
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
    const clone = template.content.cloneNode(true);
    // توضیح: cloneNode(true) یک نسخه عمیق (Deep clone) از تمپلیت می‌سازد.
    // تمام عناصر داخل تمپلیت در clone کپی می‌شوند.
    clone.querySelector('h3').textContent = pet.name;
    // توضیح: داخل clone، اولین عنصر <h3> را پیدا کرده و اسم حیوان را قرار می‌دهد.
    clone.querySelector('.pet-species').textContent = pet.species;
    // توضیح: متن placeholder گونه حیوان با مقدار واقعی جایگزین می‌شود
    clone.querySelector('.pet-age').textContent = pet.age;
    // توضیح: متن placeholder سن حیوان با مقدار واقعی جایگزین می‌شود
    clone.querySelector('.pet-description').textContent = pet.description;
    // توضیح: متن توضیحات placeholder با توضیح واقعی حیوان جایگزین می‌شود
    clone.querySelector('.pet-photo').src = pet.photoUrl;
    // توضیح: مسیر عکس placeholder با مسیر عکس واقعی حیوان جایگزین می‌شود
    wrapper.appendChild(clone);
    // . اضافه کردن کلون به DocumentFragment
    console.log(pet.name)
    // نام هر حیوان را در کنسول چاپ می‌کنیم


  })
  document.querySelector('.list-of-pets').appendChild(wrapper);
  // . اضافه کردن همه کارت‌ها به صفحه در یک عملیات
} // پایان تابع petsArea


// 6) صدا زدن تابع
petsArea()
// در نهایت تابع را فراخوانی می‌کنیم تا همه‌ی مراحل اجرا شوند

