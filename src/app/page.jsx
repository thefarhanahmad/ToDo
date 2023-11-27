"use client";

import { useEffect, useState } from "react";
import ToDoItems from "./components/ToDoItems";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import toast from "react-hot-toast";

export default function Home() {
  // state management
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  // console.log("item : ",item)
  console.log("todo items : ", todo);

  // funtion to get all todo items
  const getTodos = async () => {
    const response = await axios.get("/api/todo");
    // console.log("response : ",response)
    setTodo(response.data);
  };

  useEffect(() => {
    getTodos();
  }, [item]);

  //function to add TodoList
  const addTodo = async (e) => {
    e.preventDefault();

    if (item != "") {
      const response = await axios.post("api/todo", {
        todo: item,
      });

      setItem("");
      toast.success("Item added successfully!");
    } else {
      toast.error("Invalid todo , Please add something !");
    }
  };
  return (
    <main className="bg-gray-200 w-full flex justify-center p-6">
      {/*todo wrapper */}
      <div className="md:w-1/2 flex gap-4 flex-col items-center p-2 sm:w-3/4 w-[80vw] bg-white">
        <h1 className="text-2xl font-bold underline">To Do App</h1>

        {/* form */}
        <form
          onSubmit={addTodo}
          className="w-[80%] bg-gray-200 rounded overflow-hidden"
        >
          <div className="w-full flex">
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              placeholder="Enter here..."
              className="w-[80%] outline-none border-2 px-2 py-4"
            />
            <button
              type="submit"
              className="w-[20%] flex justify-center items-center overflow-hidden"
            >
              <GrAdd className="text-3xl font-semibold text-green-600 hover:text-green-700" />
            </button>
          </div>
        </form>

        {/* items to show in todo list */}
        {todo.map((todo) => {
          return <ToDoItems key={todo._id} todo={todo.todo} id={todo._id} />;
        })}
      </div>
    </main>
  );
}
