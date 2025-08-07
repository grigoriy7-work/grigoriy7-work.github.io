import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Перевод...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
