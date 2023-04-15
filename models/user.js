const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    // how a single element in array will look like the given data fields
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
