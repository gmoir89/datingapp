import { createContext, useContext, useState } from "react";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  // memory-only consent flag:
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <StudyContext.Provider value={{ consentGiven, setConsentGiven }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}
export function withStudy(Component) {
  return function WrappedComponent(props) {
    const study = useStudy();
    return <Component {...props} study={study} />;
  };
}