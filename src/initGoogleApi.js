import { gapi } from "gapi-script";

const initGoogleApi = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SCOPES =
    "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

  // Debugging: Log the values being used for the API initialization
  console.log("API Key:", API_KEY);
  console.log("Client ID:", CLIENT_ID);
  console.log("Scopes:", SCOPES);

  gapi.load("client:auth2", () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        console.log("Google API client has been initialized successfully.");
        gapi.auth2
          .init({
            client_id: CLIENT_ID,
            scope: SCOPES,
          })
          .then(() => {
            console.log(
              "Google Auth2 client has been initialized successfully."
            );
          })
          .catch((e) => {
            console.error("Error initializing the Google Auth2 client:", e);
          });
      })
      .catch((e) => {
        console.error("Error initializing the Google API client:", e);
      });
  });
};

export default initGoogleApi;
