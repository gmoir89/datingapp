import { Navigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";

export default function RequireConsent({ children }) {
  const { consentGiven } = useStudy();
  return consentGiven
    ? children
    : <Navigate to="/" replace />;
}
// This component checks if the user has given consent.
// If not, it redirects them to the ConsentPage.