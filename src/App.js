import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StudyProvider } from "./context/StudyContext";
import RequireConsent from "./components/RequireConsent";
import ConsentPage from "./pages/ConsentPage";
import RatingPage from "./pages/RatingPage";
import DebriefPage from "./pages/DebriefPage";

/**
 * App.js – sets up routing and guards
 * Wrapped in StudyProvider for shared consent state.
 */
function App() {
  return (
    <StudyProvider>
      <Router>
        <Routes>
          {/* Public consent page */}
          <Route path="/" element={<ConsentPage />} />

          {/* Protected rating page: requires consent */}
          <Route
            path="/rate"
            element={
              <RequireConsent>
                <RatingPage />
              </RequireConsent>
            }
          />

          {/* Protected debrief page: also requires consent */}
          <Route
            path="/debrief"
            element={
              <RequireConsent>
                <DebriefPage />
              </RequireConsent>
            }
          />

          {/* Redirect any unknown path to consent */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StudyProvider>
  );
}

export default App;
// This is the main entry point for the web app.
// It sets up the routing for the consent, rating, and debrief pages,
// and wraps everything in the StudyProvider to manage consent state.
// The RequireConsent component ensures that users cannot access the rating or debrief pages
// without first giving consent on the consent page.
