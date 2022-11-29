import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date();
  return (
    <div className="flex fixed w-full text-sm items-center sm:flex-row flex-col justify-around bg-slate-900 text-gray-500 py-2 sm:py-3  bottom-0 right-0 left-0 z-10">
      <p className="flex whitespace-nowrap">
        Copyright &copy; {`${currentYear.getFullYear()}`}&nbsp;TheHouseHub
      </p>
      <div className="flex items-center justify-evenly">
        <p className="flex whitespace-nowrap justify-center text-center text-xs ">
          &nbsp;Design by: <a href="https://junfelv.com">&nbsp; Junfel</a>
        </p>
        <div className="flex space-x-3 ml-6">
          <a href="https://github.com/vjunfel/">
            <FaGithub className="text-lg" />
          </a>
          <a href="https://www.linkedin.com/in/junfel-velasco-03394a80/">
            <FaLinkedin className="text-lg" />
          </a>
          <a href="https://twitter.com/Lefnuj">
            <FaTwitter className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
}
