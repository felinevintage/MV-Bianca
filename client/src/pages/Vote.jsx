import { useEffect, useState } from "react";
import React from "react";
import { useParams } from 'react-router-dom';
import '../Events.css';

export default function Vote() {
  // useParams returns an object with keys for each URL parameter
const { id } = useParams();
const [event, setEvent] = useState([]);
const emoji = '\u{1F38A}'

  useEffect(() => {
    getEvent();
  }, [id]);

  async function getEvent() {
    try {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      console.log(data);
    }
  }


  // Now you can use id in your component logic
  return (
    <div>
      <h2 className="event_title">{emoji} {event.event_title} {emoji}</h2>
      <h3> {event.event_date} {event.event_time} </h3>
      <h6>{event.created_by}</h6>
      <form>
      <label htmlFor= "voterName">Enter your name: </label>
      <input type= "text" id="voterName"/>
      {/* Vote component logic goes here */}
      </form> <br></br>
      <button>Submit vote</button>
    </div>
  );
}


// grab the id from the params of the URL using useParams()
// we have to call a function getEvent from a useEffect (look at Events.jsx for an example  )
// display the evnet on the page
// show a form that asks for user anme and option
// when the form is submitted, we have to call a function createVote
// that's going to make a fetch request to the server to create a vote (POST /api/events/:id/votes)