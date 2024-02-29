import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      const response = await fetch("/api/index/events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className= "container justify-contents-center">
      <h1> Events</h1>
      <div>
        <img className= "banner-image justify-contents-center" src="https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8809.jpg" alt="" />
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="no-bullets">
             📅 <Link to={`/vote/${event.id}`}>{event.event_title}</Link>
            {console.log(event)}
          </li>
        ))}
      </ul>
    </div>
  );
}
