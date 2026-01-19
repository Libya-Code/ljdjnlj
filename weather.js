const WMO_WEATHER_CODES = [
  {
    code: "مشمس", wmo: 0, emoji: "☀️", text: "شمس"
  },

  { code: "مشمس_جزئيا", wmo: 1, emoji: "🌤️", text: "شمس مع سحب" },
  { code: "غيوم_خفيفة", wmo: 2, emoji: "⛅", text: "غيوم خفيفة" },
  { code: "غائم", wmo: 3, emoji: "☁️", text: "غيوم كثيفة" },

  { code: "ضباب", wmo: 45, emoji: "🌫️", text: "ضباب" },
  { code: "ضباب_متجمد", wmo: 48, emoji: "🌫️❄️", text: "ضباب متجمد" },

  { code: "رذاذ_خفيف", wmo: 51, emoji: "🌦️", text: "رذاذ مطري خفيف" },
  { code: "رذاذ_متوسط", wmo: 53, emoji: "🌦️", text: "رذاذ مطري متوسط" },
  { code: "رذاذ_كثيف", wmo: 55, emoji: "🌧️", text: "رذاذ مطري كثيف" },

  { code: "مطر_خفيف", wmo: 61, emoji: "🌧️", text: "مطر خفيف" },
  { code: "مطر_متوسط", wmo: 63, emoji: "🌧️", text: "مطر متوسط" },
  { code: "مطر_غزير", wmo: 65, emoji: "🌧️🌧️", text: "مطر غزير" },

  { code: "ثلج_خفيف", wmo: 71, emoji: "❄️", text: "ثلج خفيف" },
  { code: "ثلج_متوسط", wmo: 73, emoji: "❄️❄️", text: "ثلج متوسط" },
  { code: "ثلج_كثيف", wmo: 75, emoji: "❄️❄️❄️", text: "ثلج كثيف" },

  { code: "حبيبات_ثلج", wmo: 77, emoji: "🌨️", text: "حبيبات ثلج" },

  { code: "زخات_مطر_خفيفة", wmo: 80, emoji: "🌦️", text: "زخات مطر خفيفة" },
  { code: "زخات_مطر", wmo: 81, emoji: "🌧️", text: "زخات مطر" },
  { code: "زخات_مطر_قوية", wmo: 82, emoji: "⛈️", text: "زخات مطر قوية" },

  { code: "زخات_ثلج_خفيفة", wmo: 85, emoji: "🌨️❄️", text: "زخات ثلج خفيفة" },
  { code: "زخات_ثلج_قوية", wmo: 86, emoji: "🌨️❄️❄️", text: "زخات ثلج قوية" },

  { code: "عاصفة_رعدية", wmo: 95, emoji: "⛈️", text: "عاصفة رعدية" },
  { code: "عاصفة_مع_برد", wmo: 96, emoji: "⛈️🧊", text: "عاصفة مع برد" },
  { code: "عاصفة_شديدة", wmo: 99, emoji: "⛈️🔥", text: "عاصفة رعدية شديدة" }
];


axios.get('https://api.open-meteo.com/v1/forecast?latitude=28&longitude=17&hourly=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,rain,precipitation,weather_code')
  .then(function (response) {
    console.log(response.data);
    if (response.data.current.is_day == "1") {
      // استدعاء العنصر مباشرة بالـ tag
      let is_day = document.getElementById("body");
     document.getElementById("myChart").style.background = "#d6d6d652"
      // تبديل الكلاس
      is_day.classList.toggle("body1");

    } else {
      let is_day = document.querySelector("body");
      // تبديل الكلاس
      is_day.classList.toggle("body0");
    }
    for (let element of WMO_WEATHER_CODES) {
      if (element.wmo == response.data.current.weather_code) {
        console.log(element);
        document.getElementById("weather_code").innerHTML = element.emoji

      }

    }
    document.getElementById("temperature").innerHTML = `
    <span> 
    <span id="temperature_2m">${response.data.current.temperature_2m}</span>${response.data.current_units.temperature_2m}</span>
    `
    document.getElementById("relative_humidity_2m").innerText = " الرطوبه " + response.data.current.relative_humidity_2m + response.data.current_units.relative_humidity_2m
    document.getElementById("wind_speed_10m").innerText = "الرياح " + response.data.current.wind_speed_10m + response.data.current_units.wind_speed_10m
    // <img src="img/sun.png" alt="">
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg'
    });
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '12:00 ص',
          '1:00 ص',
          '2:00 ص',
          '3:00 ص',
          '4:00 ص',
          '5:00 ص',
          '6:00 ص',
          '7:00 ص',
          '8:00 ص',
          '9:00 ص',
          '10:00 ص',
          '11:00 ص',
          '12:00 م',
          '1:00 م',
          '2:00 م',
          '3:00 م',
          '4:00 م',
          '5:00 م',
          '6:00 م',
          '7:00 م',
          '8:00 م',
          '9:00 م',
          '10:00 م',
          '11:00 م'
        ], // المحور X
        datasets: [{
          label: 'درجة الحرارة °C',
          data: response.data.hourly.temperature_2m, // المحور Y
          borderColor: 'rgb(252, 54, 19)',
          backgroundColor: 'rgba(204, 97, 47, 0.2)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'نسبة رطوبه %',
          data: response.data.hourly.relative_humidity_2m, // المحور Y
          borderColor: 'rgb(25, 215, 221)',
          backgroundColor: 'rgba(59, 107, 116, 0.2)',
          fill: true,
          tension: 0.3
        }, {
          label: 'سرعة رياح km/h',
          data: response.data.hourly.wind_speed_10m, // المحور Y
          borderColor: 'rgb(32, 221, 25)',
          backgroundColor: 'rgba(5, 197, 47, 0.2)',
          fill: true,
          tension: 0.3
        }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'متغيرات الطقس كل ساعة'
          }
        }
      }
    });
  })
