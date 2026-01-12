import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";
// import { Auth0Provider } from "@auth0/auth0-react";
// Use createRoot() instead of render()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain="dev-xyz.us.auth0.com"
      clientId="765775805532-23nthf4j15ih3efno6gehbi6bd3m20p2.apps.googleusercontent.com"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }} */}
    {/* > */}
      <App />
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
