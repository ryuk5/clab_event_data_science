import React from "react";

import logo from "../img/logo.png";

const Footer = () => {
  return (
    <>
      <div className="place">
        <i className="fa fa-calendar-check-o"></i> 16 January 2021 &nbsp;
        <i className="fa fa-map-marker"></i>&nbsp;Ariana, Tunis.
      </div>
      <div className="logo">
        <img src={logo} alt="" width="60" height="60" />
      </div>
    </>
  );
};

export default Footer;
