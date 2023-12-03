import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const ToDoItems = ({ todo, id }) => {
  // function to delete todo
  const deleteItem = async () => {
    const response = await axios.delete(`/api/todo?id=${id}`);
    toast.success("Item deleted successfully!");
  };

  return (
    <div className="w-full rounded mb-4 bg-gray-300 border border-gray-400 flex items-center justify-between p-4">
      <span className="text-xl">{todo}</span>
      <button
        onClick={deleteItem}
        className="text-3xl text-red-600 hover:text-red-700"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default ToDoItems;
