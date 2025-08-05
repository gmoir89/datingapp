import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useStudy } from "../context/StudyContext";

/**
 * ConsentPage.jsx
 * Implements the Participant Information Sheet and Consent Form template (EMS10513)
 */
export default function ConsentPage() {
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();
  const { setConsentGiven, setParticipantId } = useStudy();

  const handleProceed = async () => {
    if (!consent) return;
    try {
      const docRef = await addDoc(collection(db, "participants"), {
        consentGiven: true,
        consentAt: serverTimestamp(),
      });
      setParticipantId(docRef.id);
      setConsentGiven(true);
      navigate("/demographics", { replace: true });
    } catch (error) {
      console.error("Error creating participant record:", error);
      alert(`Error creating participant record: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <img
        src={`${process.env.PUBLIC_URL}/images/abertay-logo.jpg`}
        alt="Abertay University logo"
        className="w-48 mb-6"
      />
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-6 text-sm leading-relaxed">

        {/* Project Title & Researcher */}
        <h1 className="text-2xl font-bold text-center">
          Project title: AI‑Driven Fake Profile Detection in Online Dating Platforms (EMS10513)
        </h1>
        <p className="text-center font-semibold">Researcher: Graeme Moir</p>

        {/* What is the research about? */}
        <h2 className="font-semibold">What is the research about?</h2>
        <p>
          We invite you to participate in a study to understand how easily users can distinguish real dating profiles from AI‑generated ones. You will view 30 profiles, each displaying an image and an “About me” description, and decide whether each is “Human” or “AI.”
        </p>

        {/* Do I have to take part? */}
        <h2 className="font-semibold">Do I have to take part?</h2>
        <p>
          Participation is voluntary. You may choose to participate or not, and you may withdraw at any time without giving a reason or penalty. Withdrawing before final submission will prevent any of your responses from being saved.
        </p>

        {/* What will I be required to do? */}
        <h2 className="font-semibold">What will I be required to do?</h2>
        <p>
          You will browse up to 30 profiles and for each select “Human” or “AI,” then rate your confidence level on a slider from 0 (not confident) to 10 (confident). The session lasts about 10–15 minutes. You may skip profiles or quit at any time by closing your browser; incomplete data will not be recorded.
        </p>

        {/* How will you handle my data? */}
        <h2 className="font-semibold">How will you handle my data?</h2>
        <p>
          Your data will be stored in an anonymized form and will only be accessible to the researcher. This means that nobody including the researcher could reasonably identify you within the data. Your data will be stored in a local database, with data fully anonymised at the point of collection. Your responses are treated in the strictest confidence - it will be impossible to identify individuals within a dataset when any of the research is disseminated (e.g., in publications/presentations/datasets). Abertay University acts as Data Controller (DataProtectionOfficer@abertay.ac.uk).
        </p>

        {/* Retention of research data */}
        <h2 className="font-semibold">Retention of research data</h2>
        <p>
          Researchers are obliged to retain research data for up to 10 years’ post-publication, however your anonymised research data may be retained indefinitely (e.g., so that researchers engage in open research, and other researchers can access their data to confirm the conclusions of published work). Consistent with our data retention
 
policy, researchers retain consent forms for as long as we continue to hold information about a data subject and for 10 years for published research (including Research Degree thesis).

        </p>

        {/* Consent statement */}
        <h2 className="font-semibold">Consent statement</h2>
        <p>
          Abertay University attaches high priority to the ethical conduct of research. Please consider the following before indicating your consent.
        </p>
        <p>
          By clicking the box below, you confirm that you agree to participate in this study and that your data may be stored and used for the purposes described. You indicate consent under the following assumptions:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li>I understand the information provided and have had the opportunity to ask questions.</li>
          <li>My participation is entirely voluntary and I can withdraw at any time without penalty.</li>
          <li>My data will be handled confidentially and stored securely.</li>
        </ul>

        {/* Consent checkbox */}
        <label className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-pink-600 w-5 h-5"
          />
          <span className="select-none">
            I consent to take part in this research and agree to the storage and processing of my anonymised responses.
          </span>
        </label>

        {/* Complaint and privacy link */}
        <p className="text-xs text-gray-500">
          For complaints or to view our privacy notice, visit{' '}
          <a
            href="https://www.abertay.ac.uk/legal/privacy-notice-for-research-participants/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            abertay.ac.uk/legal/privacy-notice-for-research-participants
          </a>
          .
        </p>

        {/* Proceed button */}
        <button
          disabled={!consent}
          onClick={handleProceed}
          className={`mt-6 w-full py-3 rounded-full font-medium transition ${
            consent
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Let’s Go
        </button>
      </div>
    </div>
  );
}
// This code defines a React component for a consent page in a web application.
// It provides information about a research study, collects participant consent,