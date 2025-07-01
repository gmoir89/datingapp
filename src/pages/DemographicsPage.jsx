import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useStudy } from "../context/StudyContext";

// Top 20 languages + options
const languages = [
  "Arabic", "Bengali", "Chinese", "English", "French", "German", "Hindi", "Italian", "Japanese", "Javanese", "Korean", "Marathi", "Portuguese", "Punjabi", "Russian", "Spanish", "Tamil", "Telugu", "Turkish", "Vietnamese", "Other", "Prefer not to say"
];

// Dating apps options
const datingApps = [
  "Bumble", "Coffee Meets Bagel", "eHarmony", "Grindr", "Happn", "Her", "Hinge", "Match.com", "OkCupid", "Plenty of Fish", "Tinder", "None", "Other", "Prefer not to say"
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
  const [firstLanguage, setFirstLanguage] = useState("");
  const [appsUsed, setAppsUsed] = useState([]);
  const [saving, setSaving] = useState(false);

  // Check that required fields are selected
  const allSelected = [age, gender, education, ethnicity, techExperience, firstLanguage]
    .every((field) => field !== "");

  // Proceed to rating page after saving demographics
  const handleProceed = async () => {
    if (!allSelected || !participantId) return;
    setSaving(true);
    try {
      const participantRef = doc(db, "participants", participantId);
      await updateDoc(participantRef, {
        demographics: { age, gender, education, ethnicity, techExperience, firstLanguage, appsUsed },
        demographicsAt: serverTimestamp(),
      });
      navigate("/rate", { replace: true });
    } catch (err) {
      console.error("Error saving demographics:", err);
      alert("Failed to save your responses. Please try again.");
      setSaving(false);
    }
  };

  // Helper to render a single-select dropdown
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

  // Render checkboxes for dating apps
  const renderCheckboxGroup = (label, values, onChange, options) => (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-2">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="inline-flex items-center">
            <input
              type="checkbox"
              value={opt}
              checked={values.includes(opt)}
              onChange={(e) => {
                const { checked, value } = e.target;
                if (checked) onChange([...values, value]);
                else onChange(values.filter((v) => v !== value));
              }}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
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
          "Female","Male","Non-binary","Other","Prefer not to say"
        ])}

        {renderSelect("Education level", education, setEducation, [
          "None","Standard Grade/GCSE","Higher/Advanced Higher/A-Level","HNC/HND","Graduate degree","Postgraduate degree","Undergraduate degree","Other","Prefer not to say"
        ])}

        {/* Ethnicity dropdown with optgroups */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ethnicity
          <select
            value={ethnicity}
            onChange={(e) => setEthnicity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          >
            <option value="" disabled>-- Select --</option>
            <optgroup label="Asian">
              <option value="Asian Bangladeshi">Bangladeshi</option>
              <option value="Asian Chinese">Chinese</option>
              <option value="Asian Indian">Indian</option>
              <option value="Asian Other">Any other Asian background</option>
              <option value="Asian Pakistani">Pakistani</option>
            </optgroup>
            <optgroup label="Black">
              <option value="Black African">African</option>
              <option value="Black African American">African American</option>
              <option value="Black Caribbean">Caribbean</option>
              <option value="Black Other">Any other Black background</option>
            </optgroup>
            <optgroup label="Mixed or Multiple ethnic groups">
              <option value="Mixed White and Black African">White and Black African</option>
              <option value="Mixed White and Black Caribbean">White and Black Caribbean</option>
              <option value="Mixed White Other">Any other Mixed or Multiple background</option>
            </optgroup>
            <optgroup label="Other ethnic groups">
              <option value="Arab">Arab</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Latino">Latino</option>
              <option value="Native American">Native American</option>
              <option value="Pacific Islander">Pacific Islander</option>
              <option value="Other">Any other ethnic group</option>
            </optgroup>
            <optgroup label="White">
              <option value="White English">English</option>
              <option value="White Gypsy or Irish Traveller">Gypsy or Irish Traveller</option>
              <option value="White Irish">Irish</option>
              <option value="White Northern Irish">Northern Irish</option>
              <option value="White Other">Any other White background</option>
              <option value="White Scottish">Scottish</option>
              <option value="White Welsh">Welsh</option>
            </optgroup>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>

        {renderSelect("Experience with technology", techExperience, setTechExperience, [
          "Advanced","Beginner","Expert","Intermediate","None","Prefer not to say"
        ])}

        {renderSelect("First language", firstLanguage, setFirstLanguage, languages)}

        {renderCheckboxGroup("I have used the below apps before", appsUsed, setAppsUsed, datingApps)}

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
// This code defines a React component for a demographics page in a web application. It collects demographic information from users such as age