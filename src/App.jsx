import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import "./App.scss";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => console.log(tasks.length), [tasks.length]);

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>To-Do List</h1>
          {tasks.length > 1
            ? tasks.length + " tasks remaining"
            : tasks.length === 0
            ? "You have no pending tasks!"
            : "1 task remaining"}
        </div>
        <div className="content">
          {tasks.map((task, idx) => (
            <Task
              key={idx}
              text={task.text}
              editing={task.editing}
              onClickEdit={() =>
                setTasks((prev) => {
                  let newarr = prev;
                  newarr[idx].editing = true;
                  return [...newarr];
                })
              }
              onSave={(text) =>
                setTasks((prev) => {
                  let newarr = prev;
                  newarr[idx].text = text;
                  newarr[idx].editing = false;
                  return [...newarr];
                })
              }
              onClickDelete={() => {
                let newarr = tasks;
                newarr.splice(idx, 1);
                setTasks([...newarr]);
              }}
            />
          ))}
          <div className="task-placeholder">
            <button
              className="filled-button"
              onClick={() => {
                setTasks((prevTasks) => [
                  ...prevTasks,
                  { text: "", editing: true },
                ]);
              }}
            >
              <CreateOutlinedIcon />
              <span>Add a task</span>
            </button>
            <button className="filled-button">
              <AddBoxOutlinedIcon />
              <span>Add random cat facts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
