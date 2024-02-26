import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.log(data);
    }
  }

  return (
    <div>
      Events
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/vote/${event.id}`}>{event.event_title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
