const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false; // telling user is treated as 'guest' (not authorized).
    return next();
    // to avoid other code running
  }
  const token = authHeader.split(' ')[1]; // two values - Bearer and token_value
  if (!token || token === '') {
    console.log("Entered");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    console.log(token);
    decodedToken = jwt.verify(token, 'somesupersecretkey');
    console.log(`Decoded token is:${decodedToken}`);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  // finally authorized
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
