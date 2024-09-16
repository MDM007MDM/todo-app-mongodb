'use client';
import { useEffect, useState } from "react";
import Todo, { ITodo } from "./Todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    name: '',
    description: '',
    status: false,
    duedate: ''
  });
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/v1/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      const todos: ITodo[] = data.data;
      setTodos(todos);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  function AddHandler() {
    const todo = {
      ...currentTodo,
      status: false
    }
    fetch('/api/v1/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json()).then(data => {
      setTodos([...todos, data.data]);
      setCurrentTodo({
        name: '',
        description: '',
        status: false,
        duedate: ''
      });
    }).catch(err => {
      console.log(err);
    });
  }
  function DoneHandler(index: number) {
    fetch('/api/v1/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: todos[index]._id
      })
    }).then(res => res.json()).then(data => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  }
  function UpdateHandler(index: number) {
    fetch('/api/v1/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: todos[index]._id
      })
    }).then(res => res.json()).then(data => {
      const newTodos = [...todos];
      newTodos[index] = data.data;
      setTodos(newTodos);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <>
      <div className="flex justify-center my-8">
        <div className="container border border-gray-400 p-8 rounded-lg bg-amber-100">
          <p className="text-6xl font-bold flex justify-center text-amber-950">Todo App</p>
          <div className="flex justify-end">
            <div className="grid gap-y-2.5">
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2 text-amber-950">ชื่อเรื่อง: </label>
                <input type="text" id="name" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2 " onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    name: event.target.value
                  });
                }} value={currentTodo.name} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2 text-amber-950">รายละเอียด: </label>
                <input type="text" id="description" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    description: event.target.value
                  });
                }} value={currentTodo.description} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2 text-amber-950">วันครบกำหนด: </label>
                <input type="datetime-local" id="date" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2 text-center" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    duedate: event.target.value
                  });
                }} value={currentTodo.duedate} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <button className="bg-amber-950 text-white rounded-lg p-2 w-full sm:col-span-1 lg:col-span-3" onClick={AddHandler}>เพิ่ม</button>
              </div>
            </div>
          </div>
          <hr className="m-6" />
          <div className="grid gap-y-4">
            {todos.map((todo, index) => {
              return <Todo key={index} todo={todo} todoIndex={index} donHandler={DoneHandler} updateHandler={UpdateHandler} />
            })}
          </div>
        </div>
      </div>
    </>
  );
}
