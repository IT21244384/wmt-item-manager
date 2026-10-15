import mongoose from "mongoose";
import app from "../app.js";

// Vercel serverless entry: reuse one MongoDB connection across invocations
let connection;

export default async function handler(req, res) {
  try {
    if (!connection) connection = mongoose.connect(process.env.MONGO_URI);
    await connection;
  } catch (error) {
    connection = undefined;
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "Database connection error" }));
  }

  return app(req, res);
}
