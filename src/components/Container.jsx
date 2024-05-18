import { cn } from "@/lib/utils";
import React from "react";

export const Container = ({ children, styles }) => {
  return (
    <div className={cn("w-auto h-auto rounded-none shadow-md m-0 p-0", styles)}>
      {children}
    </div>
  );
};
