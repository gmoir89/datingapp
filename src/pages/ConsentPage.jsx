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
      // create a new participant record in Firestore
      const docRef = await addDoc(collection(db, "participants"), {
        consentGiven: true,
        consentAt: serverTimestamp(),
      });
      // save that participant ID for later use
      setParticipantId(docRef.id);
      setConsentGiven(true);
      navigate("/rate", { replace: true });
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

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-4 text-sm leading-relaxed">
        <h1 className="text-2xl font-bold text-center">
          Project title: AI-Driven Fake Profile Detection in Online Dating Platforms Using Reverse Image Lookup and Text-Based Analysis
        </h1>
        <p className="font-semibold">Researcher name(s): Graeme Moir</p>

        <p>Thank you for taking part in this research project; your contribution is valuable.</p>

        <h2 className="font-semibold">Nature of research</h2>
        <p>
          The aim of this website is to gauge how easy it is for a standard user to tell what appears to be a ‘real’ dating profile and what is ‘fake’. You will see 30 profiles and it is your job to decide whether you think the profile is real, ai, or are not sure.
        </p>

        <h2 className="font-semibold">Instructions</h2>
        <p>
          You will see 30 profiles and it is your job to decide whether you think the profile is real, AI-generated, or you are not sure. Select one of the three options for each profile, then use the slider to indicate how confident you are in your choice. When you are ready to move onto the next profile, click the "Next" button. You can quit the study at any time by closing the browser tab or clicking the "Quit" button. If you quit, your responses will not be saved.
        </p>

        <h2 className="font-semibold">Data</h2>
        <p>
          Your data will be stored. If you no longer wish to participate in the research, you are free to withdraw at any time. You will be able to withdraw until <strong>01/08/2025</strong>. If your information is anonymous at the point of collection or subsequently anonymised, we will not be able to withdraw it after that point because we will no longer know which information is yours.
        </p>

        <h2 className="font-semibold">Sources of support</h2>
        <p>If taking part in the research has raised any issues for you personally, you can contact….</p>

        {/* Consent checkbox */}
        <label className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-pink-600 w-5 h-5"
          />
          <span className="select-none">
            Please tick the following box to confirm you are happy to take part
          </span>
        </label>

        {/* Contact */}
        <h2 className="font-semibold pt-4">Contact</h2>
        <p>
          If you have any further questions, you may contact the researcher or my supervisor on the details below.
        </p>
        <p className="text-blue-600">2404561@uad.ac.uk</p>

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
          Let&rsquo;s Go
        </button>
      </div>
    </div>
  );
}
// Note: Ensure you have the necessary Firebase setup and context provider in your app for this to work correctly.
// This component assumes you have a StudyContext that provides setConsentGiven and setParticipantId functions