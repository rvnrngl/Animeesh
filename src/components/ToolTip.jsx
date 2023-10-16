import React from "react";

export const ToolTip = ({ title }) => {
  return (
    <span className="p-2 opacity-0 text-xs whitespace-nowrap shadow-md lowercase group-hover:opacity-100 transition-opacity ease-in-out duration-200 bg-black text-gray-100 rounded-md absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-[100%]">
      {title}
    </span>
  );
};
