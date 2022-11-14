import React from 'react';
import ReactDOM from 'react-dom/client';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import global_es from './assets/translations/golbal-es.json';
import global_en from './assets/translations/global-en.json';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  }
});

root.render(
  <I18nextProvider i18n={i18next}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>
);

