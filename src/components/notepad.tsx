import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function Notepad() {
  const { content: subjectContent } = useParams<{ content: string }>();
  const [content, setContent] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Capitalize first letter of subject for display
  const subjectTitle = subjectContent
    ? subjectContent.charAt(0).toUpperCase() + subjectContent.slice(1)
    : "Notepad";

  useEffect(() => {
    // Prevent scrolling when notepad is mounted
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleClear = () => {
    setContent("");
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="notepad-container">
      <div className="notepad-paper">
        <div className="notepad-title-bar">
          <h1 className="notepad-title">{subjectTitle} - Notepad</h1>
        </div>
        <div className="notepad-toolbar">
          <div className="toolbar-group">
            <label htmlFor="font-size" className="toolbar-label">
              Font Size
            </label>
            <select
              id="font-size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="toolbar-select"
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="20">20px</option>
              <option value="24">24px</option>
              <option value="28">28px</option>
              <option value="32">32px</option>
            </select>
          </div>
          <div className="toolbar-group">
            <label htmlFor="font-color" className="toolbar-label">
              Text Color
            </label>
            <input
              id="font-color"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="toolbar-color-input"
            />
          </div>
          <div className="toolbar-group toolbar-actions">
            <button className="toolbar-btn" onClick={handleClear} title="Clear">
              Clear
            </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          className="notepad-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder=""
          style={{
            color: fontColor,
            fontSize: `${fontSize}px`,
            backgroundColor: "transparent",
          }}
        />
        <div className="notepad-status-bar">
          <span>Words: {wordCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Notepad;
