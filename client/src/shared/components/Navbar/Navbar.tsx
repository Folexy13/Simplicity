import React, { useState } from "react";
import "./Navbar.scss";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../../hooks";
import { NavLink } from "react-router-dom";
import { ROUTE } from "../../../pages";
import { Dropdown } from "..";

const links = [
  { title: "Profile", url: "#" },
  { title: "Link 2", url: "#" },
  // Add more links here
];

const Navbar: React.FC = () => {
  const [mode, toggleMode] = useTheme();
  const [nameInitial, setNameInitial] = useState("G");
  const [firstName, setFirstName] = useState("Guest");
  return (
    <div className="navbar">
      <ul className="navbar_menu">
        <li className="circle">
          <NavLink to={ROUTE.HOME}>{nameInitial}</NavLink>
        </li>
        <li className="name">
          <Dropdown name={firstName} menu={links} />
        </li>
        <li>
          <NavLink to={ROUTE.COURSE}>Courses</NavLink>
        </li>
        <li>
          <NavLink to={ROUTE.PLAN}>Pricing</NavLink>
        </li>
      </ul>
      <ul className="navbar_menu">
        <li>
          <NavLink to={ROUTE.LOGIN}>Login</NavLink>
        </li>
        <li>
          <button onClick={toggleMode}>
            {mode === "light" ? <IoMoon /> : <IoSunny />}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
