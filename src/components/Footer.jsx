import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date();
  return (
    <div className="flex fixed w-full text-sm items-center sm:flex-row flex-col justify-around bg-slate-900  py-6 bottom-0 right-0 left-0 z-10">
      <p className="flex whitespace-nowrap">
        Copyright &copy; {`${currentYear.getFullYear()}`}&nbsp;TheHouseHub
      </p>
      <p className="flex whitespace-nowrap justify-center text-center">
        &nbsp;Design by: Junfel
      </p>
      <span className="flex gap-3 mt-2">
        <a href="https://github.com/vjunfel/">
          <FaGithub className="text-lg" />
        </a>
        <a href="https://www.linkedin.com/in/junfel-velasco-03394a80/">
          <FaLinkedin className="text-lg" />
        </a>
        <a href="https://twitter.com/Lefnuj">
          <FaTwitter className="text-lg" />
        </a>
      </span>
    </div>
  );
}
