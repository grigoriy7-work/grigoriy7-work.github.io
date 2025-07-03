import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ModalWindow } from './../homeworks/components/ModalWindow';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Текст писать тут</p>
      </header>
      <ModalWindow title="my window">
        <h2>text</h2>
      </ModalWindow>
    </div>
  );
}

export default App;
