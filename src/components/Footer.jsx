import React from "react";

export default function Footer() {
  const currentYear = new Date();
  return (
    <div className="flex fixed w-full text-sm items-center justify-center bg-slate-900  py-6 bottom-0 right-0 left-0">
      <p>
        Copyright {`${currentYear.getFullYear()}`} | TheHouseHub - Design by:
        Junfel
      </p>
    </div>
  );
}
