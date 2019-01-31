import React, { ReactNode } from "react";
import "./Modal.css";

export default ({
  children,
  onBackgroundClick,
  open
}: {
  children: ReactNode;
  onBackgroundClick(): void;
  open: boolean;
}) => (
  <div
    className="ModalBackground"
    style={open ? {} : { display: "none" }}
    onClick={onBackgroundClick}
  >
    <div
      className="Modal"
      onClick={event => {
        event.stopPropagation();
      }}
    >
      {children}
    </div>
  </div>
);
