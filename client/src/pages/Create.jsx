import { useState } from "react";
import { Link } from "react-router-dom";
export const options = [
  '🍿 Cinema',
  '🎳 Bowling',
  '🔓 Escape Room',
  '🍽️ Evening Meal',
  '🍻 Bar/ Pub',

  ];
export default function create() {
  const [event, setEvent] = useState({
    event_title: "",
    event_date: "",
    event_time: "",
    created_by: "",
  });
 
  const pencil_emoji = '\u{1FA84}'
   

  function hangleInputChange(e) {
    setEvent((event) => ({ ...event, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div> 
      <nav>
      <ul className="nav-links">
      <li>
        <Link to="/">Events Home</Link>
          </li>
          </ul>
          </nav>
      <h2>{pencil_emoji} Create your event {pencil_emoji} </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="event_title">Event Title:</label>
        <input
          type="text"
          id="event_title"
          name="event_title"
          value={event.event_title}
          onChange={hangleInputChange}
        />
<br></br>
        <label htmlFor="event_date">Event Date:</label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={event.event_date}
          onChange={hangleInputChange}
        />
       
        <label htmlFor="event_time">Event Time:</label>
        <input
          type="time"
          id="event_time"
          name="event_time"
          value={event.event_time}
          onChange={hangleInputChange}
        />
        <br></br>
        <label htmlFor="created_by">Created By:</label>
        <input
          type="text"
          id="created_by"
          name="created_by"
          value={event.created_by}
          onChange={hangleInputChange}
        />
       
      <fieldset><legend>Activity options</legend>
      <ul>
        {
        options.map(option => <li className="no-bullets">{option}</li>)
        }
      </ul>
      </fieldset> <br></br>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
