import { useEffect, useState } from "react";
import React from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";



export default function Vote() {
  // useParams returns an object with keys for each URL parameter
const { id } = useParams();
const [event, setEvent] = useState({});
const emoji = '\u{1F38A}'
const [vote, setVote] = useState({ chosen_by:"", activity_type:"", notes:"" }); 

  useEffect(() => {
    getEvent();
  }, [id]);

  async function getEvent() {
    try {
      const response = await fetch(`/api/index/events/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`api/index/events/${id}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vote),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

function handleChange(e) {
  setVote((vote) => ({ ...vote, [e.target.name]: e.target.value }));
}
  // Now you can use id in your component logic
  return (
    <div>
      <h2 className="event_title">{emoji} {event.event_title} {emoji}</h2>
      <h4> Date: {event.event_date} Time: {event.event_time} </h4>
      <h6>{event.created_by}</h6>
      <form onSubmit ={handleSubmit}>
      <label htmlFor= "voterName">Enter your name: </label> <br></br>
      <input onChange ={handleChange} type= "text" name="chosen_by" value = {vote.chosen_by}/>
    
      <ul>
        
      <input onChange ={handleChange} type="radio" name="activity_type" value={vote.activity_type}/> <label></label>, <br></br>
        
      </ul> 
      <label htmlFor= "voteNote">Note:</label> <input onChange ={handleChange} type="text" name ="notes" value={vote.notes}/> 
      <button type= "submit">Submit vote</button>
      </form> 
    </div>
    
  );
}


// grab the id from the params of the URL using useParams()
// we have to call a function getEvent from a useEffect (look at Events.jsx for an example  )
// display the evnet on the page
// show a form that asks for user anme and option
// when the form is submitted, we have to call a function createVote
// that's going to make a fetch request to the server to create a vote (POST /api/events/:id/votes)