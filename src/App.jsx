import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import Task from "./components/Task";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { getFacts } from "./helpers/Api";

import "./App.scss";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [numFacts, setNumFacts] = useState(1);
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  useEffect(() => setAwaitingResponse(false), [idCounter]);

  // Spring animations
  const taskTransitions = useTransition(tasks, (task) => task.key, {
    from: { opacity: 0, transform: "translate3d(0,-30px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-30px,0)" },
  });
  const modalTransitions = useTransition(modalOpen, null, {
    from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,40px,0)" },
  });

  const handleChange = (e, item) => {
    setTasks((prev) => {
      let newarr = prev;
      newarr[tasks.map((task) => task.key).indexOf(item.key)].text =
        e.target.value;
      return [...newarr];
    });
  };

  const handleEdit = (item) => {
    setTasks((prev) => {
      let newarr = prev;
      newarr[tasks.map((task) => task.key).indexOf(item.key)].editing = true;
      return [...newarr];
    });
  };

  const handleSave = (item) => {
    setTasks((prev) => {
      let newarr = prev;
      newarr[tasks.map((task) => task.key).indexOf(item.key)].editing = false;
      return [...newarr];
    });
  };

  const handleDelete = (item) => {
    setTasks(
      tasks.filter((task) => {
        return task.key !== item.key;
      })
    );
  };

  const handleComplete = (item) => {
    let newarr = tasks;
    newarr[
      tasks.map((task) => task.key).indexOf(item.key)
    ].completed = !item.completed;
    setTasks([...newarr]);
  };

  const handleAdd = () => {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          key: idCounter,
          text: "",
          editing: true,
          completed: false,
        },
      ];
    });
    setIdCounter((prev) => prev + 1);
  };

  const addCatFacts = () => {
    setAwaitingResponse(true);
    getFacts(numFacts).then((response) => {
      setTasks((prev) => [
        ...prev,
        ...response.map((item, idx) => ({
          key: idCounter + idx,
          text: item.fact,
          editing: false,
          completed: false,
        })),
      ]);
      setIdCounter((prev) => (prev += response.length));
    });
  };

  return (
    <div className="App">
      <div className={"main-container" + (modalOpen ? " min-h" : "")}>
        <div className="header">
          <h1>To-Do List</h1>
          Click on a task to cross it out
        </div>
        <div className="content">
          <div className="task-list">
            {taskTransitions.map(({ item, props, key }) => (
              <Task
                key={key}
                style={props}
                text={item.text}
                editing={item.editing}
                completed={item.completed}
                onChange={(e) => handleChange(e, item)}
                onClickEdit={() => handleEdit(item)}
                onSave={() => handleSave(item)}
                onClickDelete={() => handleDelete(item)}
                onComplete={() => handleComplete(item)}
              />
            ))}
          </div>
          <div className="task-placeholder">
            <button className="filled-button" onClick={handleAdd}>
              <CreateOutlinedIcon />
              <span>Add a task</span>
            </button>
            <ClickAwayListener onClickAway={() => setModalOpen(false)}>
              <button
                className="filled-button facts"
                onClick={() => setModalOpen((prev) => !prev)}
              >
                <AddBoxOutlinedIcon />
                <span>Add random cat facts</span>
                {modalTransitions.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div
                        className="facts-modal"
                        key={key}
                        style={props}
                      >
                        <input
                          type="number"
                          onClick={(e) => e.stopPropagation()}
                          value={numFacts}
                          onChange={(e) => setNumFacts(e.target.value)}
                          min={1}
                          disabled={awaitingResponse}
                        />
                        <div
                          className="filled-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!awaitingResponse) {
                              addCatFacts();
                            }
                          }}
                          disabled={awaitingResponse}
                        >
                          Add
                        </div>
                      </animated.div>
                    )
                )}
              </button>
            </ClickAwayListener>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
