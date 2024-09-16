import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface TodoResult {
  name: string;
}

const uri = process.env.MONGODB_URL as string;

let cachedDb: mongoose.Connection;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const conn = await mongoose.connect(uri);
    cachedDb = conn.connection;
    return cachedDb;
  }
  const TodoSchema = new mongoose.Schema({
    name: String,
  });
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
  
  export async function GET() {
    try {
      await connectToDatabase();
      const todoResult = await Todo.find({});
      return NextResponse.json({ data: todoResult });
    } catch (err) {
      return NextResponse.json({
        message: err,
      });
    }
  }
  