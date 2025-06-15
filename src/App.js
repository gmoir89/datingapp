import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StudyProvider } from "./context/StudyContext";
import RequireConsent from "./components/RequireConsent";
import ConsentPage from "./pages/ConsentPage";
import RatingPage from "./pages/RatingPage";
import DebriefPage from "./pages/DebriefPage";

/**
 * App.js – Main entry point of the application.
 * Wraps the router in a StudyProvider to manage consent state globally.
 * Uses HashRouter to support GitHub Pages hosting.
 * Protects /rate and /debrief routes via RequireConsent guard.
 */
function App() {
  return (
    <StudyProvider>
      <Router>
        <Routes>
          {/* Public: Consent must be given first */}
          <Route path="/" element={<ConsentPage />} />

          {/* Protected: Rating page requires consent */}
          <Route
            path="/rate"
            element={
              <RequireConsent>
                <RatingPage />
              </RequireConsent>
            }
          />

          {/* Protected: Debrief page requires consent */}
          <Route
            path="/debrief"
            element={
              <RequireConsent>
                <DebriefPage />
              </RequireConsent>
            }
          />

          {/* Fallback: redirect unknown routes to consent */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StudyProvider>
  );
}

export default App;
// This is the main entry point of the React application.
// It sets up the routing and context provider for managing study consent state.
// The app uses HashRouter to ensure compatibility with GitHub Pages hosting.
// The RequireConsent component protects the rating and debrief pages,
// ensuring users have given consent before accessing those routes.
