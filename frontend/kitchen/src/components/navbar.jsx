import React from "react";

const navbar = () => {
  return (
    <div className="main">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Orders
        </a>

        <a className="navbar-brand" href="#">
          <h4> Hi 'Insert User Name'! Welcome to 'Insert Restaurant Name'</h4>
        </a>
        <button className="btn btn-primary btn-badge btn-lg"> Log In</button>
      </nav>
    </div>
  );
};

export default navbar;
