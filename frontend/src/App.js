import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        {/* Refer React-Router v6 docs for deep understanding,if coming from v5 */}
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              {!this.state.token && <Route path="/" element={<AuthPage />} />}
              {this.state.token && <Route path="/" element={<EventPage />} />}
              {this.state.token && (
                <Route exact path="/auth" element={<EventPage />} />
              )}
              {!this.state.token && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="/events" element={<EventPage />} />
              {this.state.token && (
                <Route path="/bookings" element={<BookingPage />} />
              )}
              {/* When logging out, redirect to 'auth' endpoint */}
              {!this.state.token && (
                <Route path="/bookings" element={<Navigate to="/auth" />} />
              )}
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
