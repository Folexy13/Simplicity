import React from "react";
import "./Offline.scss";
import { logo } from "../../shared/assets";

const OfflinePage: React.FC = () => {
  return (
    <div className="offline-page">
      <div className="logo">
        <img src={logo} alt="" />
        <h1> Simplicity</h1>
      </div>
      <h1>You're offline</h1>
      <p>Please check your internet connection and try again.</p>
    </div>
  );
};

export default OfflinePage;
