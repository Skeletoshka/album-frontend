import React, { Component } from 'react';
import Students from './Students';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import AddStudent from "./AddStudent";

document.documentElement.lang = 'ru';
moment.locale('ru');

class App extends Component {
  render() {
    return (
        <div id='main'>
        <BrowserRouter>
          <Routes>
              <Route path='/:facultyId' element={<Students />} />
              <Route path='/student/:facultyIdNum' element={<AddStudent />} />
          </Routes>
        </BrowserRouter>
        </div>
    )
  }
}

export default App;