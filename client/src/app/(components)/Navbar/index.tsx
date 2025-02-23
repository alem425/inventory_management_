"use client";
/* Any event handlers or functionality thingies need to have "use client*/
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import Image from "next/image";

const Navbar = () => {
  // Grab dispatch
  const dispatch = useAppDispatch();

  //Grab state of whether sidebar is collapsed or not
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  //make the state change function for toggling sidebar
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          {/* icon for button */}
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          {/* search bar  */}
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          {/* Bell Icon in search bar */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      {/* Right Side */}

      <div className="flex justify-between items-center gap-5">
        {/* This hides all the elements not needed for smaller screens! */}
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            {/* Gonna make a button thats a Sun icon for dark mode */}
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
              {/* // <Sun className="cursor-pointer text-gray-500" size={24} /> */}
            </button>
          </div>
          {/* Hardcoded noti bell  */}
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://s3-inventorymanagement4.s3.us-east-1.amazonaws.com/alex.JPG"
              alt="Profile"
              width={33}
              height={25}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold">Alex Morgan</span>
          </div>
        </div>
        {/* end of hidden elements */}
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
