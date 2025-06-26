import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useStudy } from "../context/StudyContext";

const countries = [
  "United Kingdom", "United States", "Canada", "Australia", "India", "Germany", "France", "Other", "Prefer not to say"
];

export default function DemographicsPage() {
  const navigate = useNavigate();
  const { participantId, consentGiven } = useStudy();

  // Route guard: ensure consent stage completed before demographics
  useEffect(() => {
    if (!consentGiven || !participantId) {
      navigate("/", { replace: true });
    }
  }, [consentGiven, participantId, navigate]);

  // Form state for demographic fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [techExperience, setTechExperience] = useState("");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);

  // Check that all fields are selected
  const allSelected = [age, gender, education, ethnicity, techExperience, country]
    .every((field) => field !== "");

  // Proceed to rating page after saving demographics
  const handleProceed = async () => {
    if (!allSelected || !participantId) return;
    setSaving(true);
    try {
      const participantRef = doc(db, "participants", participantId);
      await updateDoc(participantRef, {
        demographics: { age, gender, education, ethnicity, techExperience, country },
        demographicsAt: serverTimestamp(),
      });
      navigate("/rate", { replace: true });
    } catch (err) {
      console.error("Error saving demographics:", err);
      alert("Failed to save your responses. Please try again.");
      setSaving(false);
    }
  };

  // Helper to render a dropdown
  const renderSelect = (label, value, onChange, options) => (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 p-2"
      >
        <option value="" disabled>-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Abertay logo */}
      <img
        src={`${process.env.PUBLIC_URL}/images/abertay-logo.jpg`}
        alt="Abertay University logo"
        className="w-48 mb-6"
      />
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Tell us about you</h1>
        {renderSelect("Age range", age, setAge, [
          "Under 18","18-24","25-34","35-44","45-54","55-64","65+","Prefer not to say"
        ])}
        {renderSelect("Gender", gender, setGender, [
          "Male","Female","Non-binary","Other","Prefer not to say"
        ])}
        {renderSelect("Education level", education, setEducation, [
          "High School","Undergraduate degree","Graduate degree","Postgraduate degree","Prefer not to say"
        ])}
        {renderSelect("Ethnicity", ethnicity, setEthnicity, [
          "White","Black","Asian","Hispanic","Other","Prefer not to say"
        ])}
        {renderSelect("Experience with technology", techExperience, setTechExperience, [
          "None","Beginner","Intermediate","Advanced","Expert","Prefer not to say"
        ])}
        {renderSelect("Country of birth", country, setCountry, countries)}

        <button
          onClick={handleProceed}
          disabled={!allSelected || saving}
          className={`mt-6 w-full py-3 rounded-full font-medium transition ${
            allSelected && !saving
              ? 'bg-pink-600 text-white hover:bg-pink-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {saving ? 'Saving...' : 'Proceed to Ratings'}
        </button>
      </div>
    </div>
  );
}
