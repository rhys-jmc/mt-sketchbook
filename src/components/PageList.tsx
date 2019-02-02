import React from "react";
import { Page } from "../types";
import PageListItem from "./PageListItem";
import "./PageList.css";

export default ({
  activePageId,
  onPageClick,
  pages
}: {
  activePageId: number;
  onPageClick(id: number): () => void;
  pages: Page[];
}) => (
  <ul className="PageList">
    {pages.map(({ id, label }) => (
      <PageListItem
        key={id}
        isActive={id === activePageId}
        label={label}
        onClick={onPageClick(id)}
      />
    ))}
  </ul>
);
