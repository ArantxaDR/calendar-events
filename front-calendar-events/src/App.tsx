import React, { useEffect, useState } from 'react';
import './App.scss';
import { eventsService } from './services/dbService';
import { EventsDB } from './interfaces/eventsDB.interface';
import FullCalendar, { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalComponent from "./components/modal/ModalComponent";

function App() {

  const [events, setEvents] = useState<EventsDB[]>([])
  const [eventsInput, setEventsInput] = useState<EventInput[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventsDB>()
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

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



  const showModal = (event: EventsDB) => {
    setSelectedEvent(event);
    handleOpenClose();
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log("empty event");
    let emptyEvent = {} as EventsDB;
    emptyEvent.title = "";
    emptyEvent.description = "";
    emptyEvent.startdate = selectInfo.start;
    emptyEvent.enddate = selectInfo.start;
    showModal(emptyEvent);
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    let event = events.find((obj) => {
      return obj.id.toString() === clickInfo.event.id;
    });

    if (event !== undefined) {
      showModal(event);
    }

  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>estamos probando</h1>
      </header>
      <main>
        <ModalComponent open={open} setOpen={setOpen} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={eventsInput}
          selectable={true}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
        /></main>
      <footer>eSTE ES EL FOOTER</footer>
    </div>
  );
}

export default App;


