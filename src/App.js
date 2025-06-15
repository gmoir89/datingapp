import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ConsentPage from "./pages/ConsentPage";
import RatingPage from "./pages/RatingPage";
import DebriefPage from "./pages/DebriefPage";

/**
 * HashRouter keeps GitHub Pages happy: URLs look like
 *   /#/          → ConsentPage
 *   /#/rate      → RatingPage
 *   /#/debrief   → DebriefPage
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsentPage />} />
        <Route path="/rate" element={<RatingPage />} />
        <Route path="/debrief" element={<DebriefPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;