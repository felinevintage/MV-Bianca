import React from "react";
import { useState, useEffect } from "react";


const initial = {
    event_title: "",
    event_date: "",
    event_time: "",
    created_by: "",
    user_id: null
}

export default function Create() {

  const [event, setEvent] = useState({ ...initial });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setEvent((prevEvent) => ({ ...prevEvent, user_id: storedUserId }));
    }
  }, []);
 
  
  function handleInputChange(e) {
    setEvent((input) => ({ ...input, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/index/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({...event }),
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
    <>
    <div className="container d-flex pt-5 justify-content-center"> 
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group pt-4">
        <label className="form-label fw-semibold pt-3">Event Title</label>
        <input
          type="text"
          id="event_title"
          name="event_title"
          value={event.event_title}
          onChange={handleInputChange}
          className="form-select"
        />
        </div>
        <div className="form-group mb-6">
        <label className="form-label fw-semibold pt-3">Event Date</label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={event.event_date}
          onChange={handleInputChange}
          className="form-select"
        />
       </div>
       <div className="form-group mb-6">
        <label className="form-label fw-semibold pt-3">Event Time</label>
        <input
          type="time"
          id="event_time"
          name="event_time"
          value={event.event_time}
          onChange={handleInputChange}
          className="form-select"
        />
        </div>
        <div className="form-group mb-6">
        <label className="form-label fw-semibold pt-3">Created By:</label>
        <input
          type="text"
          id="created_by"
          name="created_by"
          value={event.created_by}
          onChange={handleInputChange}
          className="form-select"
        />
        </div>
        <div className="form-group pt-4">
        <button type="submit" className="btn btn-success">Create Event</button>
        </div>
      </form>
    </div>
    </>
  );
}
