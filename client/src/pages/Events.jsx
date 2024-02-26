import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Events.css';


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
    <div className= "events-container">
      <h1> Events</h1>
      <div>
        <img className= "banner-image" src="https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8809.jpg" alt="" />
      </div>
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
