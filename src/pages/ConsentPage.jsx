import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useStudy } from "../context/StudyContext";

/**
 * ConsentPage.jsx
 * - Displays study information and Abertay logo
 * - Requires user to check the consent box
 * - Creates a new participant in Firestore and stores the generated ID
 * - Only then enables "Let's Go" to proceed and flips consentGiven
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
      alert("There was an error setting up your participation. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Abertay logo */}
      <img
        src={`${process.env.PUBLIC_URL}/images/abertay-logo.jpg`}
        alt="Abertay University logo"
        className="w-48 mb-6"
      />

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-6 text-sm leading-relaxed">
        {/* Title & Researchers */}
        <h1 className="text-2xl font-bold text-center">
          Project title: AI-Driven Fake Profile Detection in Online Dating Platforms Using Reverse Image Lookup and Text-Based Analysis
        </h1>
        <p className="font-semibold text-center">Researcher name(s): Graeme Moir</p>

        {/* Intro */}
        <p>Thank you for taking part in this research project; your contribution is valuable.</p>

        {/* Nature */}
        <h2 className="font-semibold">Nature of research</h2>
        <p>
          The aim of this website is to gauge how easy it is for a standard user to tell what appears to be a ‘real’ dating profile and what is ‘fake’. You will see 30 profiles and it is your job to decide whether you think the profile is real, AI-generated, or you are not sure.
        </p>

        {/* Instructions */}
        <h2 className="font-semibold">Instructions</h2>
        <p>
          Select one of the three options for each profile, then use the slider to indicate how confident you are in your choice. When you are ready to move onto the next profile, click “Next.” You can quit at any time by closing the tab or clicking “Quit”—if you do, your responses won’t be saved.
        </p>

        {/* Data (renamed for consistency) */}
        <h2 className="font-semibold">Data</h2>
        <p>
          Your data will be stored in anonymised form and processed as outlined in the Participant Information Sheet and Consent Form (Approval Code#). You may withdraw your data until <strong>01/08/2025</strong>. After anonymisation, we cannot identify or remove your specific responses.
        </p>

        {/* Retention */}
        <h2 className="font-semibold">Retention of Research Data</h2>
        <p>
          Researchers retain data for up to 10 years post-publication; anonymised datasets may be kept indefinitely for open research purposes.
        </p>

        {/* Support */}
        <h2 className="font-semibold">Sources of support</h2>
        <p>
          If participating raised any issues, you can contact Action Fraud on 0300 123 2040 or visit{" "}
          <a
            href="https://www.actionfraud.police.uk/a-z-of-fraud/dating-fraud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            https://www.actionfraud.police.uk/a-z-of-fraud/dating-fraud
          </a>.
        </p>

        {/* Consent Statement */}
        <h2 className="font-semibold">Consent Statement</h2>
        <p>
          Abertay University attaches high priority to the ethical conduct of research. Please consider the following before indicating your consent on this form. Indicating your consent confirms that you are willing to participate in the research, however, indicating consent does not commit you to anything you do not wish to do and you are free to withdraw at any time.
        </p>
        <p>You are indicating consent under the following assumptions:</p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li>I understand the contents of the participant information sheet and consent form.</li>
          <li>I have been given the opportunity to ask questions about the research and have had them answered satisfactorily.</li>
          <li>I understand that my participation is entirely voluntary and that I can withdraw from the research (parts or all of the project) at any time without penalty.</li>
          <li>I understand who has access to my data and how it will be handled at all stages of the research.</li>
        </ul>

        {/* Checkbox */}
        <label className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-pink-600 w-5 h-5"
          />
          <span className="select-none">
            Please tick the box to confirm you are happy to take part
          </span>
        </label>

        {/* Contact */}
        <h2 className="font-semibold pt-4">Contact</h2>
        <p>
          For questions, contact Graeme Moir at{" "}
          <a href="mailto:2404561@uad.ac.uk" className="text-blue-600 underline hover:text-blue-800">
            2404561@uad.ac.uk
          </a>{" "}
          or Dr. Lynsay Shepherd at{" "}
          <a href="mailto:lynsay.shepherd@abertay.ac.uk" className="text-blue-600 underline hover:text-blue-800">
            lynsay.shepherd@abertay.ac.uk
          </a>.
        </p>

        {/* Proceed */}
        <button
          disabled={!consent}
          onClick={handleProceed}
          className={`mt-6 w-full py-3 rounded-full font-medium transition ${
            consent ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Let’s Go
        </button>
      </div>
    </div>
  );
}
// This page displays the consent form for the study, requiring users to agree before proceeding.
// It collects consent and creates a participant record in Firestore.