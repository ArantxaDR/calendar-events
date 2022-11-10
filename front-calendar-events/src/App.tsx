import React, { useEffect, useState } from 'react';
import './App.css';
import { eventsService } from './services/dbService';
import { EventsDB } from './interfaces/eventsDB.interface';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function App() {

  const [events, setEvents] = useState<EventsDB[]>([])
  const [eventsInput, setEventsInput] = useState<EventInput[]>([])

  useEffect(() => {
    eventsService.getEvent().then((response) => {
      setEvents(response.data);
    })
  }, [])

  useEffect(() => {
    let eventsMapped = events.map((item: EventsDB) => {
      const event: EventInput = {
        id: item.id.toString(),
        title: item.title,
        start: item.startdate,
        end: item.enddate
      }
      return event;
    });
    setEventsInput(eventsMapped);
  }, [events])

  return (
    <div className="App">
      <header className="App-header">

        <h1>estamos probando</h1>
      </header>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsInput}
        selectable={true}
      />
    </div>
  );
}

export default App;
