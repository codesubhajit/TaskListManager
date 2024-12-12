import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      
      const table = new Tabulator(tableRef.current, {
        data: tasks, 
        layout: "fitColumns", 
        columns: [
          { title: "Task ID", field: "id", width: 100 },
          {
            title: "Title",
            field: "title",
            editor: "input", 
          },
          {
            title: "Description",
            field: "description",
            editor: "input", 
          },
          {
            title: "Status",
            field: "status",
            editor: "list",
            editorParams: {
              values: ["To Do", "In Progress", "Done"], 
            },
          },
          {
            title: "Actions",
            formatter: () => '<button class="btn-delete">Delete</button>',
            cellClick: (e, cell) => {
              const rowData = cell.getRow().getData();
              deleteTask(rowData.id);
            },
          },
        ],
        events: {
          cellEdited: (e, cell) => {
            const updatedTask = cell.getRow().getData();
            updateTask(updatedTask); 
          },
        },
      });

      return () => table.destroy(); 
    }
  }, [tasks]);

  return <div ref={tableRef}></div>;
};

export default TaskTable;
