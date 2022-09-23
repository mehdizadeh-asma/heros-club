import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: true },

  Field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", require: true },

  Date: { type: Date, require: true },

  Place: { type: Geolocation },

  Address: { type: String, require: true },

  ImageUrl: String,

  Status: {
    type: String,
    enum: ["Free", "Paid"],
    default: "Free",
  },

  Cost: { type: Number },
});

export default mongoose.model("Event", schema);
