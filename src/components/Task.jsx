import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import "../stylesheets/Task.scss";

const Task = (props) => {
  const [text, setText] = useState("");
  useEffect(() => setText(props.text), [props.text]);

  return (
    <div className="task">
      <div className="content">
        {props.editing ? (
          <input value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <span>{text}</span>
        )}
      </div>
      {props.editing ? (
        <button className="filled-button" onClick={() => props.onSave(text)}>
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
    </div>
  );
};

export default Task;
