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
  try {
    console.log(token);
    let decodedToken = jwt.verify(token, 'somesupersecretkey');
    console.log(`Decoded token is:${decodedToken}`);
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
