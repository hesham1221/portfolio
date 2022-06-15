import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import '../styles/modal.scss'
const Modal = ({completed,name,title}) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{title}</h2>
        <h3>{name}</h3>
        <ProgressBar completed={completed} />
      </div>
    </div>
  );
};

export default Modal;
