import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/redux/store';
// eslint-disable-next-line import/named
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './features/graphql/apolloClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Перевод...</div>}>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
