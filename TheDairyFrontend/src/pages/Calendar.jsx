import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { Dialog, Button } from '@mui/material';
import './Calendar.css';


export default function MyCalendar() {
  const [reminders, setReminders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('http://localhost:8080/calendar/reminder');
        if (!response.ok) throw new Error('Could not fetch reminders');
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error('Could not fetch reminders', error);
      }
    };

    fetchReminders();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setModalOpen(true);
  };

  const events = reminders.map(reminder => ({
    id: reminder.id,
    title: reminder.title,
    start: reminder.reminderDateTime,
    //allDay: reminder.isAllday,
  }));

  return (
    <div style={{ width: '80vw', height: '80vh', margin: 'auto' }}>
      <FullCalendar
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'prev,next'
        }}
        eventBackgroundColor='rgb(0,200,0)'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dayMaxEvents={3}
        eventClick={handleEventClick}
      />

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{ padding: '20px', minWidth: '300px' }}>
          <h2>{selectedEvent?.title}</h2>
          <p><strong>Time of event:</strong> {selectedEvent?.start?.toLocaleString()}</p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
}
