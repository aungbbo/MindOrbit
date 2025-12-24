import mindorbitLogo from "./assets/mindorbit_logo.png";
import "./App.css";
import { Link } from "react-router-dom";
// import {
//   Reality,
//   SceneGraph,
//   BoxEntity,
//   ModelEntity,
//   UnlitMaterial,
//   ModelAsset,
//   Model,
// } from "@webspatial/react-sdk";

function StartPage() {
  return (
    <div className="start-page-container">
      <img
        src={mindorbitLogo}
        alt="MindOrbit Logo"
        className="mindorbit-logo"
      />
      {/* <Model style={{ width: "200px", height: "200px" }}>
        <source src="./assets/mindorbit_3d_logo.usdz" type="model/vnd.usdz+zip" />
        <div>Fallback text if model fails to load</div>
      </Model> */}

      <Link to="/notes" className="enter-button">
        Enter Notegarden
      </Link>
    </div>
  );
}

export default StartPage;
