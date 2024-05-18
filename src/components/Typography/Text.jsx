import { cn } from "@/lib/utils";

export const Text = ({ children, styles }) => {
  return (
    <p
      className={cn(
        "text-gray-400 text-xs lg:text-base cursor-default",
        styles
      )}
    >
      {children}
    </p>
  );
};
