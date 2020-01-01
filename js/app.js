window.addEventListener("load", () => {
  let long;
  let lat;

  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let degreeSection = document.querySelector(".degree-section");
  let degreeSectionSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // DECLARING API URL
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/34ea5f38a53fab14c9bd495088a202b1/${lat},${long}`;

      // FETECHING API RESPONSE AND CONVERTING TO JSON
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // Setting DOM ELEMENTS FROM API
          locationTimezone.textContent = data.timezone;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;

          // UPDATING ICONS
          const icons = document.querySelector(".icons");
          setIcons(icon, icons);

          // FARIENHEIT TO CELCIUS FORMULA
          const celsius = (temperature - 32) * (5 / 9);

          // CONVERTING FARIENHEIT TO CELSIUS

          degreeSection.addEventListener("click", () => {
            if (degreeSectionSpan.textContent === "F") {
              degreeSectionSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              degreeSectionSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    locationTimezone.textContent = "Ooops! Seems Your browser is outdated";
    temperatureDescription.textContent =
      "Please Update your browser to use Javascript Widgets.";
  }

  // SETTING ICONS FROM SKYCONS

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
