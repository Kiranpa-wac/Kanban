import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

const BackgroundEventsCalender = () => {
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const onView = useCallback((newView) => setView(newView), []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const start = dayjs(`${newStartDate}T${newStartTime}`).toDate();
    const end = dayjs(`${newEndDate}T${newEndTime}`).toDate();

    const newEvent = {
      title: newTitle,
      start,
      end,
    };

    setEvents([...events, newEvent]);
    setNewTitle("");
    setNewStartDate("");
    setNewStartTime("");
    setNewEndDate("");
    setNewEndTime("");
    setShowModal(false);
  };

  return (
    <div style={{ height: "90vh", padding: "10px" }}>
      <Link to="/" className="btn btn-primary mb-3">
        Back
      </Link>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add Event
      </button>

      {showModal && (
        <div
          className="modal show fade"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEvent}>
                  <div className="form-group">
                    <label htmlFor="eventTitle">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Add Event
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        toolbar={true}
        events={events.map((event) => ({
          ...event,
          start: event.start.toDate ? event.start.toDate() : event.start,
          end: event.end.toDate ? event.end.toDate() : event.end,
        }))}
        views={["month", "week", "day", "agenda"]}
        view={view}
        defaultView="week"
        onView={onView}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default BackgroundEventsCalender;
