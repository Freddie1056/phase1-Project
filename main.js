document.addEventListener("DOMContentLoaded", () => {
  const cityNameInput = document.getElementById("cityName");
  const getWeatherButton = document.getElementById("getWeather");
  const weatherDisplay = document.getElementById("weather");
  const likeButton = document.getElementById("likeButton");
  const likeCount = document.getElementById("likeCount");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");
  const commentList = document.getElementById("commentList");
  const backgroundImageInput = document.getElementById("backgroundImage");
  getWeatherButton.addEventListener("click", () => {
    const cityName = cityNameInput.value.trim();
    if (cityName === "") {
      weatherDisplay.textContent = "Please enter a city name.";
      return;
    }
    getWeather(cityName);
  });
  likeButton.addEventListener("click", () => {
    toggleLike();
  });
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addComment();
  });
  backgroundImageInput.addEventListener("change", (event) => {
    handleBackgroundImage(event);
  });
  async function getWeather(cityName) {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        const weatherDescription = data.weather[0].description;
        const temperature = kelvinToCelsius(data.main.temp);
        weatherDisplay.innerHTML = `
          <h2>Weather in ${cityName}</h2>
          <p>Description: ${weatherDescription}</p>
          <p>Temperature: ${temperature}°C</p>
        `;
      } else {
        weatherDisplay.textContent =
          "Failed to fetch weather data. Please try again later.";
      }
    } catch (error) {
      weatherDisplay.textContent =
        "An error occurred while fetching weather data. Please try again later.";
    }
  }
  function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  function toggleLike() {
    likeButton.classList.toggle("liked");
    likeCount.textContent = likeButton.classList.contains("liked") ? "1" : "0";
  }
  function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText === "") {
      return;
    }
    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
    commentInput.value = "";
  }
  function handleBackgroundImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});
