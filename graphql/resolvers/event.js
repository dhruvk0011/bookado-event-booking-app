const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

// main resolvers.
module.exports = {
  // A bundle. Point at a JS object containing the resolver functions.
  events: async () => {
    // we return a list of strings(events here)
    try {
      const events = await Event.find();
      return events.map((evt) => {
        return transformEvent(evt);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!");
    }
    const evnt = new Event({
      title: args.evtInpt.title,
      description: args.evtInpt.description,
      price: +args.evtInpt.price,
      date: new Date(args.evtInpt.date),
      creator: req.userId,
    });
    console.log(evnt);
    let createdEvnt;
    // refers to Event object parameter in rootMutation (property name needs to be same)
    try {
      const res = await evnt.save();
      createdEvnt = transformEvent(res);
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User exists already.");
      }
      user.createdEvents.push(evnt);
      await user.save();
      return createdEvnt;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
