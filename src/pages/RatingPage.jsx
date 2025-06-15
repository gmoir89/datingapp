import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

// Profile data (8 sample profiles, will loop until 30 ratings given)
const profiles = [
  { name: "Alice", age: 26, bio: "Hiker and coffee lover.", img: process.env.PUBLIC_URL + "/images/alice.jpg" },
  { name: "Ben", age: 29, bio: "Tech nerd who loves cooking and photography.", img: process.env.PUBLIC_URL + "/images/ben.jpg" },
  { name: "Chloe", age: 24, bio: "Dog mum. Music lover. Adventurer.", img: process.env.PUBLIC_URL + "/images/chloe.jpg" },
  { name: "Anna", age: 32, bio: "Bookworm with a love for vintage fashion.", img: process.env.PUBLIC_URL + "/images/anna.jpg" },
  { name: "Claire", age: 35, bio: "Marketing exec who enjoys city breaks and good wine.", img: process.env.PUBLIC_URL + "/images/claire.jpg" },
  { name: "Jen", age: 31, bio: "Yoga teacher passionate about wellness and travel.", img: process.env.PUBLIC_URL + "/images/jen.jpg" },
  { name: "John", age: 38, bio: "Guitarist and dad-joke connoisseur.", img: process.env.PUBLIC_URL + "/images/john.jpg" },
  { name: "Sara", age: 34, bio: "Startup founder who never says no to sushi.", img: process.env.PUBLIC_URL + "/images/sara.jpg" },
];

export default function RatingPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(5); // Default to “unsure”
  const [completed, setCompleted] = useState(0); // Number of ratings given
  const navigate = useNavigate();

  const handleNext = () => {
    const { name } = profiles[index];
    console.log(`Rated ${name} with score ${score} (${completed + 1}/30)`);
    // TODO: Persist the rating to your backend / Firestore / Supabase etc.

    const nextCompleted = completed + 1;
    if (nextCompleted >= 30) {
      // All done: go to debrief
      navigate("/debrief", { replace: true });
      return;
    }

    // Otherwise loop to next profile
    setCompleted(nextCompleted);
    setIndex((prev) => (prev + 1) % profiles.length);
    setScore(5); // Reset slider to centre
  };

  // Quit early
  const handleQuit = () => {
    navigate("/debrief", { replace: true });
  };

  const p = profiles[index];

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-80 text-center">
        {/* Profile image */}
        <img
          src={p.img}
          alt={p.name}
          className="rounded-xl w-full h-64 object-cover mb-4"
        />

        {/* Name, age & bio */}
        <h2 className="text-xl font-semibold">
          {p.name}, {p.age}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{p.bio}</p>

        {/* Progress */}
        <p className="text-xs text-gray-500 mb-4">Profile {completed + 1} of 30</p>

        {/* Confidence slider */}
        <label htmlFor="confidence" className="block text-sm font-medium mb-1">
          How confident are you this is a real human?
        </label>
        <input
          id="confidence"
          type="range"
          min="0"
          max="10"
          step="1"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full accent-pink-500 cursor-pointer mb-2"
        />
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>AI</span>
          <span>Unsure</span>
          <span>Human</span>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="bg-red-500 hover:bg-red-600 rounded-full p-4 transition mx-auto block"
          aria-label="Submit rating and see next profile"
        >
          <Heart className="text-white w-6 h-6" />
        </button>

        {/* Quit button below Next */}
        <button
          onClick={handleQuit}
          className="mt-4 text-sm text-gray-700 hover:text-gray-900"
        >
          Quit
        </button>
      </div>
    </div>
  );
}
