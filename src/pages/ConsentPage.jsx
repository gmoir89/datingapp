import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConsentPage() {
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Abertay logo */}
      <img
        src={`${process.env.PUBLIC_URL}/images/abertay-logo.jpg`}
        alt="Abertay University logo"
        className="w-48 mb-6"
      />

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-4 text-sm leading-relaxed">
        <h1 className="text-2xl font-bold text-center">Project title: AI-Driven Fake Profile Detection in Online Dating Platforms Using
Reverse Image Lookup and Text-Based Analysis
</h1>
        <p className="font-semibold">Researcher name(s): Graeme Moir</p>

        <p>
          Thank you for taking part in this research project; your contribution
          is valuable.
        </p>

        <h2 className="font-semibold">Nature of research</h2>
        <p>
          The aim of this website is to gauge how easy it is for a standard
          user to tell what appears to be a ‘real’ dating profile and what is
          ‘fake’.
        </p>

        <h2 className="font-semibold">Data</h2>
        <p>
          Your data will be stored. If you no longer wish to participate in the
          research, you are free to withdraw at any time. You will be able to
          withdraw until <strong>01/08/2025</strong>. If your information is
          anonymous at the point of collection or subsequently anonymised, we
          will not be able to withdraw it after that point because we will no
          longer know which information is yours.
        </p>

        <h2 className="font-semibold">Sources of support</h2>
        <p>
          If taking part in the research has raised any issues for you
          personally, you can contact….
        </p>

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
          If you have any further questions, you may contact the researcher or
          my supervisor on the details below.
        </p>
        <p className="text-blue-600">2404561@uad.ac.uk</p>

        {/* Proceed button */}
        <button
          disabled={!consent}
          onClick={() => navigate("/rate", { replace: true })}
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
