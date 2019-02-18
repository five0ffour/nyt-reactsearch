import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center", backgroundColor: "#EBB12F", margin: "5px 0 5px 0" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
