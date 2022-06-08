import React, { Component } from 'react';
import Students from './Students';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

document.documentElement.lang = 'ru';
moment.locale('ru');

class App extends Component {
  render() {
    return (
        <div id='main'>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Students />} />
          </Routes>
        </BrowserRouter>
        </div>
    )
  }
}

export default App;