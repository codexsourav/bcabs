const address = "Calcutta, West Bengal, India";
const apiKey = "AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40";
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  address
)}&key=${apiKey}`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const results = data.results;
    if (results.length > 0) {
      const addressComponents = results[0].address_components;
      const cityComponent = addressComponents.find((component) =>
        component.types.includes("locality")
      );

      if (cityComponent) {
        const cityName = cityComponent.long_name;
        console.log("City:", cityName);
      } else {
        console.log("City name not found in the address components.");
      }
    } else {
      console.log("No results found for the given address.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data from Google Places API:", error.message);
  });
