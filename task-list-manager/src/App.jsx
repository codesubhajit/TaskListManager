import React, { useState, useEffect } from "react";
import TaskTable from "./Components/TaskTable";
import AddTaskForm from "./Components/AddTaskForm";
import FilterTasks from "./Components/FilterTasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
   
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.map((task) => ({
          id: task.id,
          title: task.title,
          description: "",
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(formattedTasks);
      });
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
   
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const filteredTasks = tasks.filter((task) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      (task.status.includes(filterStatus) || !filterStatus) &&
      (task.title.toLowerCase().includes(lowercasedSearchTerm) ||
        task.description.toLowerCase().includes(lowercasedSearchTerm))
    );
  });

  const statusCounts = {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    "Done": tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task List Manager</h1>
      <div className="flex justify-between mb-6">
        <FilterTasks filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <p className="text-lg font-semibold">Total Tasks by Status:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>To Do: {statusCounts["To Do"]}</li>
          <li>In Progress: {statusCounts["In Progress"]}</li>
          <li>Done: {statusCounts["Done"]}</li>
        </ul>
      </div>
      <AddTaskForm addTask={addTask} />
      <TaskTable tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
      <ToastContainer />
    </div>
  );
};

export default App;
