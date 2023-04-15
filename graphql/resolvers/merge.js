const Event = require("../../models/event");
const User = require("../../models/user");
const DataLoader = require("dataloader");
const { dateToString } = require("../../helpers/date");

const eventLoader = new DataLoader((eventIds) => {
  return eventMerger(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  console.log(userIds);
  return User.find({ _id: { $in: userIds } });
});
// returns event data object
const transformEvent = (et) => {
  return {
    ...et._doc,
    _id: et.id,
    date: dateToString(et._doc.date),
    creator: userMerger.bind(this, et.creator),
  };
};

// return a booking object
const transformBooking = (bkng) => {
  return {
    ...bkng._doc,
    _id: bkng.id,
    user: userMerger.bind(this, bkng._doc.user),
    event: bookingMerger.bind(this, bkng._doc.event),
    createdAt: dateToString(bkng.createdAt),
    updatedAt: dateToString(bkng.updatedAt),
  };
};

// use to populate User with Event data
const eventMerger = async (evntIds) => {
  try {
    const evnt = await Event.find({ _id: { $in: evntIds } });
    return evnt.map((et) => {
      return transformEvent(et);
    });
  } catch (err) {
    throw err;
  }
};

// Merger Booking data with user data
const bookingMerger = async (eventId) => {
  try {
    const bkEvent = await eventLoader.load(eventId.toString());
    return bkEvent;
  } catch (err) {
    throw err;
  }
};

// Use to populate Event with User
const userMerger = async (userId) => {
  try {
    const usr = await userLoader.load(userId.toString());
    return {
      ...usr._doc,
      _id: usr.id,
      createdEvents: () => eventLoader.loadMany(usr._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

// exports.userMerger = userMerger;
// exports.eventMerger = eventMerger;
// exports.bookingMerger = bookingMerger;

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
