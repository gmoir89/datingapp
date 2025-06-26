import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StudyProvider } from "./context/StudyContext";
import RequireConsent from "./components/RequireConsent";
import ConsentPage from "./pages/ConsentPage";
import DemographicsPage from "./pages/DemographicsPage";
import RatingPage from "./pages/RatingPage";
import DebriefPage from "./pages/DebriefPage";

/**
 * App.js – Main entry point of the application.
 * Wraps the router in a StudyProvider to manage consent state globally.
 * Uses HashRouter to support GitHub Pages hosting.
 * Protects routes via RequireConsent guard.
 */
function App() {
  return (
    <StudyProvider>
      <Router>
        <Routes>
          {/* Public: Consent must be given first */}
          <Route path="/" element={<ConsentPage />} />

          {/* Protected: Demographics page requires consent */}
          <Route
            path="/demographics"
            element={
              <RequireConsent>
                <DemographicsPage />
              </RequireConsent>
            }
          />

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
// This file sets up the main application structure, routing, and context provider for managing study state.
// It ensures that users must give consent before accessing any study-related pages, and uses React Router for navigation.
// The RequireConsent component acts as a guard to protect routes that require user consent, ensuring
// that the study's integrity is maintained and participants are properly informed before proceeding with the study tasks
