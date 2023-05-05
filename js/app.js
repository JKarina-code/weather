const container = document.querySelector(".container");
const result = document.querySelector("#result");
const formCountry = document.querySelector("#formCountry");
const resultP = document.querySelector(".resultP");
window.addEventListener("load", () => {
  formCountry.addEventListener("submit", searchWeather);
});

function searchWeather(e) {
  e.preventDefault();
  const city = document.querySelector("#city").value;
  const country = document.querySelector("#country").value;
  if (city === "" || country === "") {
    messageError("All fills are required");
    return;
  }

  queryAPI(city, country);
  formCountry.reset()
}

function queryAPI(city, country) {
  const appIdKey = "421d0d7b07c333cd7c7f861ac3247cc9";

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appIdKey}`;

  fetch(URL)
    .then((repons) => repons.json())
    .then((data) => {
      cleanHtml();

      if (data.cod === "404") {
        messageError("City not found");
        return;
      }
      showWeather(data);
    });
}

const kelvinCentigrade = (temp) => parseInt(temp - 273.15);
function showWeather(data) {
  const {
    main: { temp, temp_max, temp_min },
    name,
  } = data;

  const centigrade = kelvinCentigrade(temp);
  const nameCity = document.createElement("p");
  nameCity.classList.add(".pShowTemp", "text-white", "text-3xl");
  nameCity.innerHTML = `City: ${name}`;

  const present = document.createElement("p");
  present.innerHTML = ` ${centigrade} &#8451`;
  present.classList.add("font-bold", "text-5xl");

  const pShowTemp_min = document.createElement("p");
  pShowTemp_min.classList.add(".pShowTemp", "text-white", "text-3xl");
  pShowTemp_min.innerHTML = `Minimal temperature: ${temp_min} K`;

  //temp_max
  const pShowTemp_max = document.createElement("p");
  pShowTemp_max.classList.add(".pShowTemp", "text-white", "text-3xl");
  pShowTemp_max.innerHTML = `Maximum temperature: ${temp_max} K`;

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("text-center", "text-white");

  resultDiv.appendChild(present);
  result.appendChild(resultDiv);
  result.appendChild(nameCity);
  result.appendChild(pShowTemp_min);
  result.appendChild(pShowTemp_max);
}

function messageError(message) {
  const alertUnique = document.querySelector(".alert");
  if (!alertUnique) {
    const alert = document.createElement("div");
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "alert"
    );
    alert.innerHTML = `
              <strong class="font-bold">Error!</strong>
              <span class="block sm:inline">${message}</span>
          `;

    document
      .querySelector(".content")
      .insertBefore(alert, document.querySelector(".add-country"));

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function cleanHtml() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function Spinners() {
  cleanHtml();
  const divSpinners = document.createElement("div");
  divSpinners.classList.add("sk-fading-circle");
  divSpinners.innerHTML = `
       
         <div class="sk-circle1 sk-circle"></div>
         <div class="sk-circle2 sk-circle"></div>
         <div class="sk-circle3 sk-circle"></div>
         <div class="sk-circle4 sk-circle"></div>
         <div class="sk-circle5 sk-circle"></div>
         <div class="sk-circle6 sk-circle"></div>
         <div class="sk-circle7 sk-circle"></div>
         <div class="sk-circle8 sk-circle"></div>
         <div class="sk-circle9 sk-circle"></div>
         <div class="sk-circle10 sk-circle"></div>
         <div class="sk-circle11 sk-circle"></div>
         <div class="sk-circle12 sk-circle"></div>
        `;
  result.appendChild(divSpinners);
}
