import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: [true, "Title is required"] },

  ImageUrl: String,

  Status: {
    type: String,
    enum: { values: ["Active", "Deactive"], message: "{VALUE} is not supported" },
    default: "Active",
  },
});

export default mongoose.model("Field", schema);
