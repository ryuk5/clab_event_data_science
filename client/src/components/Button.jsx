import React from "react";

const Button = ({finished, onAnimate}) => {
  let msg = finished=== false ? "Book Now!" : "C-Lab Events";
return <div className="button" onClick={()=> onAnimate()} id="button">{msg}</div>;
};

export default Button;
