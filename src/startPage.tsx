import mindorbitLogo from "./assets/mindorbit.png";
import "./App.css";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div className="start-page-container">
      <img
        src={mindorbitLogo}
        alt="MindOrbit Logo"
        className="mindorbit-logo"
      />
      <Link to="/notes" className="enter-button">
        Enter Notegarden
      </Link>
    </div>
  );
}

export default StartPage;
