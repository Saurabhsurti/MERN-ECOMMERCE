import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// Import Store and persistor separately
import { Store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';


const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
 </Provider>
);

reportWebVitals();
