import React from "react";
import { Navigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";

/**
 * RequireConsent
 * Ensures the user has ticked the consent checkbox before accessing protected routes.
 * If consentGiven is false, redirects to the root (ConsentPage).
 */
export default function RequireConsent({ children }) {
  const { consentGiven } = useStudy();
  
  return consentGiven ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}
// This component checks if the user has given consent.
// If not, it redirects them to the consent page.