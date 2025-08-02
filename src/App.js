import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StudyProvider } from "./context/StudyContext";
import RequireConsent from "./components/RequireConsent";
import ConsentPage from "./pages/ConsentPage";
import DemographicsPage from "./pages/DemographicsPage";
import InstructionsPage from "./pages/InstructionsPage";
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

          {/* Protected: Instructions page requires consent */}
          <Route
            path="/instructions"
            element={
              <RequireConsent>
                <InstructionsPage />
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
// This code defines the main structure of a React application that implements a study on AI-generated dating profiles.
// It uses React Router for navigation and Firebase for data storage.
// The application includes pages for consent, demographics, instructions, rating profiles, and debriefing.
// The `StudyProvider` context manages the participant's consent state across the app.
// The `RequireConsent` component ensures that participants cannot access protected pages without giving consent first.
// The app is designed to be hosted on platforms like GitHub Pages using HashRouter for URL management.
// The `App` component sets up the routing and wraps everything in the `StudyProvider` context.
// The `Routes` component defines the different pages of the study, with route guards to ensure consent is given before accessing protected pages.
// The `Navigate` component is used to redirect users to the consent page if they try to access an unknown route.
// The application is structured to guide participants through the study process, ensuring they understand their rights and the purpose of the research.

