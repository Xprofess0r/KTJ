import { Component } from "react";

import "./index.css";

class index extends Component {
  render() {
    return (
      <div className="spinLoader" style={{ margin: "auto" }}>
        <div className="spinInner one"></div>
        <div className="spinInner two"></div>
        <div className="spinInner three"></div>
      </div>
    );
  }
}

export default index;
