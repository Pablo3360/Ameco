import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from './context/store';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(window.location.origin);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider 
        domain='dev-o0xmvfkn3u6rsl8u.us.auth0.com'
        clientId='kOQ8TZyf5NXFDOsIiyhUMIFXSdSvriQL'
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback} 
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
