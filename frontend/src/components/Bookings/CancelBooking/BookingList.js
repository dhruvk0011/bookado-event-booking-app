import React from "react";
import "./BookingList.css";

const userbookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings.map((booking) => {
      return (
        <li key={booking._id} className="bookings__items">
          <div className="bookings__items-data">
            {booking.event.title} -{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings__items-actions">
            <button
              className="btn"
              onClick={props.onDelete.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);
export default userbookingList;
