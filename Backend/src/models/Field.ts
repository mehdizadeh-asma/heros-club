import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: true },

  ImageUrl: String,

  Status: {
    type: String,
    enum: ["Active", "Deactive"],
    default: "Active",
  },
});

export default mongoose.model("Field", schema);
