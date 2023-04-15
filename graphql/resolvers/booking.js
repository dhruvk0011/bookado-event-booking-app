const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./merge");

// main resolvers.
module.exports = {
  bookingEvents: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map((bkng) => {
        return transformBooking(bkng);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    // we get the event for which a booking is happening.
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
      // timestamps 'createdAt' and 'updatedAt' are automatically updated by mongoose.
    });
    const fetchedResult = await booking.save();
    return transformBooking(fetchedResult);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const fetchedBooking = await Booking.findById(args.bookingId).populate(
        "event"
      );
      // the below line has 'fetchedBooking.event' because booking has a user and we want detail of creator
      // which is present in event
      const resultEvent = transformEvent(fetchedBooking.event);
      console.log(resultEvent);
      // to delete the Booking
      await Booking.deleteOne({ _id: args.bookingId });
      return resultEvent;
    } catch (err) {
      throw err;
    }
  },
};
