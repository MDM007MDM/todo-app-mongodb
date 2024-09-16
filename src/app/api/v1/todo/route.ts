import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import TodoModel from '@/models/todo';
import { ITodo } from "@/app/Todo";

export async function GET() {
    await connectToDatabase();
    const todo = await TodoModel.find({});
    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todos fetched successfully',
        data: todo
    });
}

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const new_todo: ITodo = await req.json();
    if (!new_todo.name || !new_todo.description || new_todo.status == undefined || !new_todo.duedate) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    const todo = new TodoModel(new_todo);
    await todo.save();
    return NextResponse.json({
        status: 'success',
        code: 201,
        data: todo
    });
}

export async function PUT(req: NextRequest) {
    await connectToDatabase();
    const updated_todo = await req.json();
    if (!updated_todo.id) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    const todo = await TodoModel.findById(updated_todo.id);
    todo.status = true;
    todo.save();

    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todo updated successfully',
        data: todo
    });
}

export async function DELETE(req: NextRequest) {
    await connectToDatabase();
    const body = await req.json();
    const { id } = body;
    if (!id) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    await TodoModel.findOneAndDelete(id);
    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todo deleted successfully'
    });
}