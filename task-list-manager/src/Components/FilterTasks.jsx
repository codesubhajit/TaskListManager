import React from "react";

const FilterTasks = ({ filterStatus, setFilterStatus }) => {
  return (
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border p-2"
    >
      <option value="">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterTasks;
