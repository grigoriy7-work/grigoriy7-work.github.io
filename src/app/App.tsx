import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <b>Цель: </b>
          <span>расширить свой кругозор современных технологий и научиться создавать готовые фронтенд проекты</span>
          <br />
          <b>Владею технологиями: </b>
          <span>c#, net framework, dot net, mssql, rabbitmq. JavaScript, jquery, node js</span>
          <br />
          <b>О себе: </b>
          <span>
            Абашкин Григорий. Мне 27 лет. Работаю в компаии Kazzinc.
            <br />
            Разрабатываю c# приложение для предприятия, около 6 лет. Работаю с net framework и dot net.
          </span>
        </p>
      </header>
    </div>
  );
}

export default App;
