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
  const petsPromise = await fetch("https://timely-dasik-6f8df1.netlify.app/.netlify/functions/pets")
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
    clone.querySelector(".pet-card").dataset.species = pet.species
    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = creatAgeText(pet.birthdayYear);
    if (!pet.photo) pet.photo = "images/purrsloud 1.jpg"
    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
    // . اضافه کردن کلون به DocumentFragment
    console.log(pet.name)
    // نام هر حیوان را در کنسول چاپ می‌کنیم


  })
  document.querySelector('.list-of-pets').appendChild(wrapper)
  // . اضافه کردن همه کارت‌ها به صفحه در یک عملیات
} // پایان تابع petsArea


// 6) صدا زدن تابع
petsArea()
// در نهایت تابع را فراخوانی می‌کنیم تا همه‌ی مراحل اجرا شوند
function creatAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear
  if (age == 1) return "1 years old"
  if (age == 0) return "less than a year old"
  return `${age} years old`
}
//pet filter button code
const allButtons = document.querySelectorAll(".pet-filter button")
allButtons.forEach(el => {
  el.addEventListener("click", handleButtonClick)
})
function handleButtonClick(e) {
  //remove active class from any and buttons
  allButtons.forEach(el => el.classList.remove("active"))
  //add active class to the specific button  that just got clicked
  e.target.classList.add("active")
  //actually filter the pets down below
  const currentFilter = e.target.dataset.filter
  document.querySelectorAll(".pet-card").forEach(el => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "grid"
    } else {
      el.style.display = "none"
    }
  })
}