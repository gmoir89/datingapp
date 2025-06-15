import { useNavigate } from "react-router-dom";

export default function DebriefPage() {
  const navigate = useNavigate();

  // Optional: allow restarting the study
  const restart = () => navigate("/", { replace: true });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Debrief</h1>

        <p>
          Thanks for completing the study! Here’s some additional information
          about the purpose of the research, how we’ll use your data, etc.
        </p>

        <p>
          If you have questions or concerns, contact{" "}
          <a href="mailto:2404561@uad.ac.uk" className="text-blue-600">
            2404561@uad.ac.uk
          </a>
          .
        </p>

        <button
          onClick={restart}
          className="mt-6 w-full py-3 rounded-full font-medium bg-pink-600 text-white hover:bg-pink-700 transition"
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
