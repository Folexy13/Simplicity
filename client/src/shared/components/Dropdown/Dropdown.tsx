import React, { useState } from "react";
import "./Dropdown.scss";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
const Dropdown: React.FC<any> = ({ menu, name }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <input className="dropdown-toggler" type="checkbox" />

      <div className="sec-center">
        <input
          className="dropdown"
          type="checkbox"
          id="dropdown"
          name="dropdown"
        />
        <label
          className="for-dropdown"
          htmlFor="dropdown"
          onClick={() => setToggle(!toggle)}
        >
          {name} {toggle ? <PiCaretUpBold /> : <PiCaretDownBold />}
        </label>
        <div className="section-dropdown">
          {menu.map((el: any, i: number) => {
            return (
              <li key={i}>
                <NavLink to={el.url}>{el.title}</NavLink>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
