import React, { useEffect, useState } from 'react';
import './App.scss';
import { eventsService } from './services/dbService';
import { EventsDB } from './interfaces/eventsDB.interface';
import FullCalendar, { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timegridplugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalComponent from "./components/modal/ModalComponent";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useTranslation } from 'react-i18next';
import esLocale from '@fullcalendar/core/locales/es';

function App() {
  const [t, i18n] = useTranslation("global");
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
      <Header />
      <main className='main'>
        <ModalComponent open={open} setOpen={setOpen} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, timegridplugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={eventsInput}
          selectable={true}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          locale={i18n.language}
          locales={[esLocale]}
          headerToolbar={{
            start: 'prevYear,prev,today,next,nextYear', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth', // will normally be on the right. if RTL, will be on the left
          }}
        /></main>
      <Footer />
    </div>
  );
}

export default App;


