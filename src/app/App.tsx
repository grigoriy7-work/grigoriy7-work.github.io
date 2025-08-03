import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Alert } from '../homeworks/components/alert/Alert';
import { ThemeContext } from 'src/homeworks/ThemeContext';
import { Layout } from 'src/homeworks/components/layout/Layout';

function App() {
  const [color, setColor] = React.useState('light');

  const toogleTheme = () => {
    setColor((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
      <Layout>
        <Alert />
      </Layout>
    </ThemeContext.Provider>
  );
}

export default App;
