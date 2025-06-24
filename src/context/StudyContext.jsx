import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const StudyContext = createContext();

// 2. Provider component wraps your app
export function StudyProvider({ children }) {
  // Starts false; flips true once they hit “Let’s Go”
  const [consentGiven, setConsentGiven] = useState(false);
  // Will hold the Firestore-generated participant ID
  const [participantId, setParticipantId] = useState(null);

  return (
    <StudyContext.Provider
      value={{ participantId, setParticipantId, consentGiven, setConsentGiven }}
    >
      {children}
    </StudyContext.Provider>
  );
}

// 3. Hook for consuming
export function useStudy() {
  return useContext(StudyContext);
}
// This custom hook allows any component to access the study context values.