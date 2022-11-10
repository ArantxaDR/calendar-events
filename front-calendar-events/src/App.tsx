import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1>estamos probando</h1>
      </header>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth" />
    </div>
  );
}

export default App;
