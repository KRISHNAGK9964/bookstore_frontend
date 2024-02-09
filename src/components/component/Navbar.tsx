import React, {  } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

// ---------------------------------------------------------------------------------------------------------------- //

interface headerProps {}

// ---------------------------------------------------------------------------------------------------------------- //

const Header: React.FC<headerProps> = ({}) => {
  //  ----------------------------------------------------------------------------------------------------------------- //
  return (
    <header className="p-4">
      <div className="mx-auto max-w-screen-md">
        <div className="flex items-center justify-between">
          <div className="flex-1" >
            <h1 className="scroll-m-20 text-6xl font-semibold tracking-tight lg:text-7xl">
              Hello!
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-20 w-20 overflow-hidden rounded-xl">
                <img
                  src={"avatar1.jpg"}
                  alt=""
                  className="object-cover scale-150 translate-y-2"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <p className="pl-1 text-lg font-medium leading-7 [&:not(:first-child)]:mt-6">
            What would you read today?
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;