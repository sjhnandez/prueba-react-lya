import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { animated } from "react-spring";

import "../stylesheets/Task.scss";

const Task = (props) => {
  return (
    <animated.div className="task" style={props.style}>
      <div className="content">
        {props.editing ? (
          <input value={props.text} onChange={props.onChange} />
        ) : (
          <span
            className={"nostyle-button" + (props.completed ? " cross-out" : "")}
            onClick={props.onComplete}
          >
            {props.text}
          </span>
        )}
      </div>
      {props.editing ? (
        <button className="filled-button" onClick={props.onSave}>
          <SaveOutlinedIcon />
        </button>
      ) : (
        <button className="filled-button" onClick={props.onClickEdit}>
          <EditOutlinedIcon />
        </button>
      )}

      <button className="filled-button" onClick={props.onClickDelete}>
        <DeleteForeverOutlinedIcon />
      </button>
    </animated.div>
  );
};

export default Task;
