import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { initScene } from "@webspatial/react-sdk";

function Notes() {
  const navigate = useNavigate();
  const circles = [
    { id: 1, label: "English", color: `hsl(${0 * 60}, 70%, 60%)` },
    { id: 2, label: "Engineering", color: `hsl(${1 * 60}, 70%, 60%)` },
    { id: 3, label: "Mathematics", color: `hsl(${2 * 60}, 70%, 60%)` },
    { id: 4, label: "Physics", color: `hsl(${3 * 60}, 70%, 60%)` },
    { id: 5, label: "History", color: `hsl(${4 * 60}, 70%, 60%)` },
    { id: 6, label: "Biology", color: `hsl(${5 * 60}, 70%, 60%)` },
  ];

  useEffect(() => {
    // Prevent scrolling when notes is mounted
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleCircleClick = (label: string) => {
    navigate(`/notes/${label.toLowerCase()}`);
  };

  return (
    <div className="notes-container">
      <div className="notes-content">
        <div className="notes-buttons">
          <button
            className="notes-btn notes-btn-left"
            onClick={() => {
              initScene("todoListScene", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 500,
                    height: 600,
                  },
                };
              });
              window.open(`${__XR_ENV_BASE__}todos`, "todoListScene");
            }}
          >
            Todo List
          </button>
          <button
            className="notes-btn notes-btn-right"
            onClick={() => {
              initScene("musicPlayerScene", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 300,
                    height: 800,
                  },
                };
              });
              window.open(`${__XR_ENV_BASE__}music`, "musicPlayerScene");
            }}
          >
            Music
          </button>
        </div>
        <div className="notes-circles-grid">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="notes-circle"
              onClick={() => handleCircleClick(circle.label)}
            >
              <span className="notes-circle-label">{circle.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
