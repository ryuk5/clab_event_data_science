import React from "react";

const Input = (props) => {
  return (
    <div className="input">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
