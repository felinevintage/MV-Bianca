import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      const response = await fetch("/api/index/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const eventsData = await response.json();
        setEvents(eventsData);
      } else {
        console.log("Failed to get events");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading events...</p>;
  }
  
  return (
    <div className="container justify-content-center mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            className="banner-image shadow p-3 rounded img-fluid"
            src="https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8809.jpg"
            alt=""
          />
        </div>
        <div className="col-md-6">
          <div className=" mt-3">
            <ul className="list-unstyled">
            {events.map((event) => (
              <li key={event.id}>
                <Link className="text-decoration-none text-dark fs-4 text-uppercase fw-semibold" to={`/vote/${event.id}`}>
                  {event.event_title}
                </Link>
                </li>
              ))}
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}
