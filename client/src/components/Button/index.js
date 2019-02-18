import React from "react";
import "./style.css";

// Destructuring the type, className, children and onClick props, applying them to the button element
function Button({ type = "default", className, children, onClick, href }) {
  return (
    <button onClick={onClick} href={href} className={["btn", `btn-${type}`, `${className}`].join(" ")}>
      {children}
    </button>
  );
}

export default Button;
