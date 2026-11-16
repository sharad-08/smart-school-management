import mongoose from "mongoose";

const schema = new mongoose.Schema({ _id: String, value: { type: Number, required: true } });
export default mongoose.model("RollCounter", schema);
