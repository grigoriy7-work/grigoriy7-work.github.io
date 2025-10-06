import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import './i18n';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Перевод...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
