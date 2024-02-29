import React from "react";
import { useState } from "react";


const initial = {
    event_title: "",
    event_date: "",
    event_time: "",
    created_by: "",
}

export default function Create() {
  const [event, setEvent] = useState({ ...initial });
 
  
  function hangleInputChange(e) {
    setEvent((event) => ({ ...event, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        setEvent({ ...initial })
      } else {
        console.log("Failed to submit")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div> 
      <h2> Create your event  </h2>
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
       
     
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
