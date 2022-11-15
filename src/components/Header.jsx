import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className=" bg-white border-b shadow-sm lg:py-2 py-2 sticky top-0 z-40">
      <header className="flex justify-between items-center px-2 container mx-auto ">
        <div>
          <img
            src="/images/HouseHub.png"
            alt="logo"
            className=" cursor-pointer w-36"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`hover:border-b-blue-600 cursor-pointer py-3 text-sm font-semibold text-gray-700 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className={`hover:border-b-blue-600 cursor-pointer py-3 text-sm font-semibold text-gray-700 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>

            <li
              className={`hover:border-b-blue-600 cursor-pointer py-3 text-sm font-semibold text-gray-700 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
