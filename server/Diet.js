import mongoose from "mongoose";

const dietSchema = new mongoose.Schema(
  {
    age: String,
    gender: String,
    height: String,
    weight: String,
    dietLevel: String,
    dietPlan: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Diet", dietSchema);