import React from "react";
import classNames from "classnames";
function Square(props) {
  return (
    <button
      onClick={props.onClick}
      className={classNames("square", {
        "hightlight": props.hightlight 
      })}
    >
      {props.value}
    </button>
  );
}

export default Square;
