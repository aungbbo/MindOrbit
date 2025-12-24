import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartPage from "./startPage";
import Notes from "./notes";
import MusicPlayer from "./musicPlayer";
import TodoList from "./todoList";
import Notepad from "./components/notepad";

function App() {
  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/webspatial/avp" element={<StartPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:content" element={<Notepad />} />
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
