import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import AuthContext from "../context/auth-context";
import BookingList from "../components/Bookings/CancelBooking/BookingList";
import BookingControls from "../components/Bookings/BookingControls/BookingControls";

class BookingPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookingEvents {
              _id
              createdAt
              event {
                _id
                title
                date
                price
              }
            }
          }
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookingEvents; // array of booking events
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteBookingHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelBooking($Id : ID!) {
            cancelBooking(bookingId : $Id) {
              _id
              title
            }
          }
        `,
      variables: {
        Id: bookingId,
      },
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((bkng) => {
            return bkng._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingControls />
          <div>
            <BookingList
              bookings={this.state.bookings}
              onDelete={this.deleteBookingHandler}
            />
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}
export default BookingPage;
