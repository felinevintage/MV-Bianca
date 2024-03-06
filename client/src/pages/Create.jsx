import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const initial = {
    event_title: "",
    event_date: "",
    event_time: "",
    created_by: ""
}

export default function Create() {
  const navigate = useNavigate();
  const [event, setEvent] = useState({ ...initial });
  const [usernames, setUsernames] = useState([]);
  const [checkedState, setCheckedState] = useState([]);



  useEffect(() => {
    getUsernames();
  }, []);

  async function getUsernames() {
    try {
      const response = await fetch("/api/index/users/username",) 
       const data = await response.json();
        setUsernames(data);
        setCheckedState(new Array(data.length).fill(false));
    } catch (err) {
      console.error(err);
    }
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
      if (!response.ok) {
        console.log("Event not created");
        return;
      }
      
        for (const [index, isChecked] of checkedState.entries()) {
          if(isChecked) {
          const voteResponse = await fetch("/api/index/votes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({

              organised_by: event.created_by,
              activity_type: event.event_title,
              username: usernames[index].username,
            }),
          });
          
          if (!voteResponse.OK) {
            console.log(`Failed to create event for ${usernames[index].username}`);
          }
        }
      }
        
        navigate("/events");
    } catch (err) {
      console.log(err);
    }
  }


  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox" && name === "invited") {
      const index = parseInt(value, 10); // Parse the value to an integer
      setCheckedState((prevState) =>
        prevState.map((state, i) => (i === index ? checked : state))
      );
    } else {
      setEvent((input) => ({ ...input, [name]: value }));
    }
  }

  const boxClicked = (index) => {
    setCheckedState((prevState) =>
    prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  
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
          <div className="form-group mb-6">
            <label className="form-label fw-semibold pt-3">Invited</label>
            {usernames.map((user, index) => (
              <div key={user.username} className="form-check" onClick={() => boxClicked(index)}>
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  name="invited"
                  value={user.username}
                  checked={checkedState[index]}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label">
                  {user.username}
                </label>
              </div>
            ))}
            <button 
            className="btn btn-success" 
            type="button"
            onClick={handleSubmit}>
              Create Event!
            </button>
          </div>
          </form>
      </div>
      
    </>
  );
}
