import React, { useEffect, useState } from 'react';
import './App.css';
import { eventsService } from './services/dbService';

import { EventsDB } from './interfaces/eventsDB.interface';
import FullCalendar, { EventApi } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function App() {
  const [events, setEvents] = useState<EventsDB[]>([])
  useEffect(() => {
    eventsService.getEvent().then((response) => {
      setEvents(response)
    })
  }, [events])

  return (
    <div className="App">
      <header className="App-header">

        <h1>estamos probando</h1>
      </header>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[events]} />
    </div>
  );
}

export default App;
