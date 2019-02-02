import React, { MouseEventHandler } from "react";
import classnames from "classnames";
import "./PageListItem.css";

interface PageListItemProps {
  isActive: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default ({ isActive, label, onClick }: PageListItemProps) => (
  <li className="PageListItem">
    <button
      className={classnames("ItemButton", isActive && "ItemButtonActive")}
      onClick={onClick}
      disabled={isActive}
    >
      {label}
    </button>
  </li>
);
