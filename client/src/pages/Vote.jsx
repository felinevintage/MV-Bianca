import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link } from 'react-router-dom';





export default function Vote() {
  // useParams returns an object with keys for each URL parameter
const { id } = useParams();
const [event, setEvent] = useState({});
 

  useEffect(() => {
    getEvent();
  }, [id]);

  

  async function getEvent() {
    try {
      const response = await fetch(`/api/index/events/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const eventsData = await response.json();
        setEvent(eventsData);
      } else {
        console.log("Failed to get events");
      }
    } catch (err) {
      console.error(err);
    }
  }



  return (
  <div className="container pt-5 text-center">
    
  <h1 className="fw-semibold">Details of your event</h1>      
  <p className="fs-3">Event: {event.event_title}</p>      
  <p className="fs-3">Date: {event.event_date}</p>
  <p className="fs-3">Time: {event.event_time}</p>  
  <Link to="/events" className="btn btn-success mt-3">
        Back to Events List
      </Link>  

  </div>
  );
}



