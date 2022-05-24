import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Client from './Client';
import Post from "./Post"
import ProjectStatus from "./ProjectStatus"
import MoveStatus from "./MoveStatus"
import Worker from "./Worker"
import Company from "./Company";
import moment from 'moment';
import 'moment/locale/ru';
import Order from "./Order";
import Project from "./Project";
import Task from "./Task";
import Move from "./Move";
import Report from "./Report";

document.documentElement.lang = 'ru';
moment.locale('ru');

class App extends Component {
  render() {
      document.body.style = 'background: #61dafb;';
    return (
        <div id='main'>
        <BrowserRouter>
          <Routes>
          </Routes>
        </BrowserRouter>
        </div>
    )
  }
}

export default App;