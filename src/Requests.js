const API_KEY = "d7aae300e395ae0fbdcfbcb4b04279d7";

const apiRequests = {
  requestPOTD: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, // Astronomy Picture of the Day
  requestMarsWeather: `https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=${API_KEY}`, // Latest Mars weather report
  requestNEO: `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-04-25&end_date=2023-04-26&api_key=${API_KEY}`, // Near Earth Objects for a specific date range
  requestEarthImagery: `https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&dim=0.1&api_key=${API_KEY}`, // Satellite imagery of Earth
  requestMarsRoverPhotos: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`, // Photos from Mars Rover on a specific Martian day (sol)
};

export default apiRequests;