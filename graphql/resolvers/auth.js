const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// main resolvers.
module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInpt.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPwd = await bcrypt.hash(args.userInpt.password, 12); // 12 rounds of salting (async - promise returned)
      const usr = new User({
        email: args.userInpt.email,
        // this is a plain text -- security flaw
        // So we create an encrypted pwd.
        password: hashedPwd,
      });
      const userSaveResult = await usr.save();
      // no need to return password, so return null instead (not changed in db)
      return { ...userSaveResult._doc, password: null, _id: userSaveResult.id };
    } catch (err) {
      throw err;
    }
  },
  // login resolver
  login: async ({ email, password }) => {
    const fetchedUser = await User.findOne({ email: email });
    if (!fetchedUser) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, fetchedUser.password);
    if (!isEqual) {
      throw new Error("Password incorrect!");
    }
    const token = jwt.sign(
      {
        userId: fetchedUser.id,
        email: fetchedUser.email,
      },
      'somesupersecretkey', // secret key for hashing and validating
      {
        expiresIn: "1h",
      } // optinal
    );
    return { userId: fetchedUser.id, token: token, tokenExpiration: 1 };
  },
};
