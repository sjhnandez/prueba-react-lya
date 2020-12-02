import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import Task from "./components/Task";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import "./App.scss";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const transitions = useTransition(tasks, (task) => task.key, {
    from: { opacity: 0, transform: "translate3d(0,-20px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-20px,0)" },
  });

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
        <animated.div className="content">
          {transitions.map(({ item, props, key }) => (
            <Task
              key={key}
              style={props}
              text={item.text}
              editing={item.editing}
              onChange={(e) =>
                setTasks((prev) => {
                  let newarr = prev;
                  newarr[tasks.map((task) => task.key).indexOf(key)].text =
                    e.target.value;
                  return [...newarr];
                })
              }
              onClickEdit={() =>
                setTasks((prev) => {
                  let newarr = prev;
                  newarr[
                    tasks.map((task) => task.key).indexOf(key)
                  ].editing = true;
                  return [...newarr];
                })
              }
              onSave={() =>
                setTasks((prev) => {
                  let newarr = prev;
                  newarr[
                    tasks.map((task) => task.key).indexOf(key)
                  ].editing = false;
                  return [...newarr];
                })
              }
              onClickDelete={() => {
                setTasks(
                  tasks.filter((task) => {
                    return task.key !== item.key;
                  })
                );
              }}
            />
          ))}
          <div className="task-placeholder">
            <button
              className="filled-button"
              onClick={() => {
                setTasks((prevTasks) => {
                  return [
                    ...prevTasks,
                    { key: idCounter, text: "", editing: true },
                  ];
                });
                setIdCounter((prev) => prev + 1);
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
        </animated.div>
      </div>
    </div>
  );
};

export default App;
