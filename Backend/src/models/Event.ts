import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: [true, "Title is required"] },

  Field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
    // require: [true, "Field Document is required"],
  },

  EventDate: { type: Date, require: [true, "Date is required"] },

  Place: {
    Type: {
      type: String,
      enum: ["Point"],
      // required: [true, "Place.Type is required"],
    },
    Coordinates: {
      type: [Number],
      // required: [true, "Place.Coordinates is required"],
    },
    // required: [true, "Place is required"],
  },

  Address: { type: String, require: [true, "Address is required"] },

  ImageUrl: String,

  Status: {
    type: String,
    enum: {
      values: ["Active", "Deactive", "Running", "Waiting", "Done"],
      message: "{VALUE} is not supported",
    },
    default: "Active",
  },

  PaymentType: {
    type: String,
    enum: ["FREE", "Cost"],
    default: "FREE",
  },

  Cost: { type: Number },
});

export default mongoose.model("Event", schema);
