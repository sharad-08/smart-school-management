import Student from "../models/studentModel.js";
import RollCounter from "../models/rollCounterModel.js";

const exact = (value) => new RegExp(`^${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

async function rollState(className, section) {
  const filter = { Class: exact(className.trim()), Section: exact(section.trim()) };
  const [summary] = await Student.aggregate([
    { $match: filter },
    { $group: { _id: null, count: { $sum: 1 }, max: { $max: { $convert: { input: "$RollNumber", to: "int", onError: 0, onNull: 0 } } } } },
  ]);
  const key = JSON.stringify([className.trim().toUpperCase(), section.trim().toUpperCase()]);
  return { key, count: summary?.count || 0, max: Math.max(0, summary?.max || 0) };
}

export async function allocateRollNumber(className, section) {
  const { key, max } = await rollState(className, section);
  // The counter advances atomically even when two admissions arrive together.
  const update = [{ $set: { value: { $add: [{ $max: [{ $ifNull: ["$value", 0] }, max] }, 1] } } }];
  let counter;
  try {
    counter = await RollCounter.findOneAndUpdate({ _id: key }, update, { upsert: true, returnDocument: "after", updatePipeline: true });
  } catch (error) {
    if (error.code !== 11000) throw error;
    counter = await RollCounter.findOneAndUpdate({ _id: key }, update, { returnDocument: "after", updatePipeline: true });
  }
  return String(counter.value);
}

export async function getNextRollNumber(req, res) {
  const { className, section } = req.query;
  if (typeof className !== "string" || !className.trim() || typeof section !== "string" || !section.trim()) {
    return res.status(400).json({ message: "Choose a class and section" });
  }
  const { key, count, max } = await rollState(className, section);
  const counter = await RollCounter.findById(key).lean();
  res.json({ success: true, count, nextRollNumber: String(Math.max(max, counter?.value || 0) + 1) });
}
