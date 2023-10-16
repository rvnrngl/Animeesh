import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavBarMenu } from "./NavBarMenu";
import { BiSolidUser } from "react-icons/bi";
import { useState } from "react";

export const AvatarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={handleClick}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="border bg-orange-400 text-zinc-900">
            <BiSolidUser className="text-md lg:text-2xl text-zinc-800" />
          </AvatarFallback>
        </Avatar>
      </button>
      <NavBarMenu isOpen={isOpen} />
    </>
  );
};
