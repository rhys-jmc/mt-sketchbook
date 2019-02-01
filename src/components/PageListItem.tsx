import React, { MouseEventHandler } from "react";
import "./PageListItem.css";

interface PageListItemProps {
  isActive: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default ({ isActive, label, onClick }: PageListItemProps) => (
  <li className={`PageListItem${isActive ? " active" : ""}`}>
    <button onClick={onClick}>{label}</button>
  </li>
);
