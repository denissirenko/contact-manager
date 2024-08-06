import React from "react";
import Tag from "./Tag";

const TagList = ({ className = "", tags }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map(({ id, tag }) => (
      <Tag key={id}>{tag}</Tag>
    ))}
  </div>
);

export default TagList;
