import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: [true, "Title is required"] },

  Field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
    require: [true, "Field Document is required"],
  },

  Date: { type: Date, require: [true, "Date is required"] },

  Place: {
    Type: {
      type: String,
      enum: ["Point"],
      required: [true, "Place.Type is required"],
    },
    Coordinates: {
      type: [Number],
      required: [true, "Place.Coordinates is required"],
    },
  },

  Address: { type: String, require: [true, "Address is required"] },

  ImageUrl: String,

  Status: {
    type: String,
    enum: ["Free", "Paid"],
    default: "Free",
  },

  Cost: { type: Number },
});

export default mongoose.model("Event", schema);
