import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";

export default function InstructionsPage() {
  const navigate = useNavigate();
  const { consentGiven, participantId } = useStudy();

  // Guard: must have consent and participantId
  useEffect(() => {
    if (!consentGiven || !participantId) {
      navigate("/", { replace: true });
    }
  }, [consentGiven, participantId, navigate]);

  const handleStart = () => {
    navigate("/rate", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Abertay logo */}
      <img
        src={`${process.env.PUBLIC_URL}/images/abertay-logo.jpg`}
        alt="Abertay University logo"
        className="w-48 mb-6"
      />
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">How to use this site</h1>
        <p className="text-gray-700">
          You will see a series of dating profiles. For each profile:
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">1. Select “Human” or “AI”</h2>
            <img
              src={`${process.env.PUBLIC_URL}/images/select.jpg`}
              alt="Select Human or AI"
              className="rounded-md w-48 mx-auto mt-2"
            />
          </div>

          <div>
            <h2 className="font-semibold">2. Rate your confidence by moving the slider</h2>
            <img
              src={`${process.env.PUBLIC_URL}/images/slide.jpg`}
              alt="Confidence slider"
              className="rounded-md w-48 mx-auto mt-2"
            />
          </div>

          <div>
            <h2 className="font-semibold">3. Click Next</h2>
            <img
              src={`${process.env.PUBLIC_URL}/images/next.jpg`}
              alt="Next button"
              className="rounded-md w-48 mx-auto mt-2"
            />
          </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-6 w-full py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition"
        >
          I&#39;m ready, start rating
        </button>
      </div>
    </div>
  );
}
// This component displays step-by-step instructions with smaller images to avoid pixelation.
// It ensures that participants understand how to interact with the rating system before proceeding to the rating page.
// The `useEffect` hook checks if the participant has given consent and has a valid participant ID before allowing access to the instructions.