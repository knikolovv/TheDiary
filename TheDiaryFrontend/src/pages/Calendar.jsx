import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import "./Calendar.css";
import EventDialog from "../components/EventModal";


export default function Calendar() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8080/calendar/event`, {
        method: "GET"
      });
      if (!response.ok) throw new Error("Could not fetch events");
      const data = await response.json();
      setCalendarEvents(data);
    } catch (error) {
      console.error("Could not fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setModalOpen(true);
  };

  const events = calendarEvents.map(event => ({
    id: event.id,
    title: event.title,
    start: event.eventDateTime,
    allDay: event.allDay,
    extendedProps: {
      createdOn: event.createdDate
    }
  }));

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/calendar/event/delete/${eventId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error(`Error deleting event with id ${eventId}`, error)
    }
  }

  const handleUpdateEvent = async (eventId, updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:8080/calendar/event/update/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      fetchEvents();
    } catch (error) {
      console.error(`Error updating event with id ${eventId}`, error)
    }
  }

  const handleCreateEvent = async (event) => {
    try {
      const response = await fetch(`http://localhost:8080/calendar/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      fetchEvents();
    } catch (error) {
      console.error("Error creating event", error)
    }
  }

  return (

    <div style={{ width: "80vw", height: "80vh", margin: "auto" }}>
      <FullCalendar
        key={calendarEvents.length}
        headerToolbar={{
          start: "title",
          center: "eventButton",
          end: "prev,next"
        }}
        customButtons={{
          eventButton: {
            text: "Create Event",
            click: () => {
              setSelectedEvent(null);
              setModalOpen(true);
            }
          }
        }}
        eventBackgroundColor="rgba(180, 5, 196, 1)"
        eventBorderColor="rgba(180, 5, 196, 1)"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        fixedWeekCount={false}
        dayMaxEvents={true}
        eventClick={handleEventClick}
      />
      <EventDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventData={selectedEvent}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent}
        onCreate={handleCreateEvent}
      />
    </div>

  );
}
