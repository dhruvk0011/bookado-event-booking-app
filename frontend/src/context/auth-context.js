// store data and bypass file tree to send/recieve data
import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
});
