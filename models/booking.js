const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // apply some options at schema
  { timestamps: true } // when data is created/updated
);

module.exports = mongoose.model("Booking", bookingSchema);
