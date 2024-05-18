import { cn } from "@/lib/utils";

export const SubText = ({ children, styles }) => {
  return (
    <p
      className={cn(
        "text-gray-300 text-base lg:text-lg cursor-default",
        styles
      )}
    >
      {children}
    </p>
  );
};
