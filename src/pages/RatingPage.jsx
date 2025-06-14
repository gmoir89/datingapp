import { useState } from "react";
import { Heart } from "lucide-react";

// TODO: replace with your real/AI generated faces
const profiles = [
  {
    name: "Alice",
    age: 26,
    bio: "Hiker and coffee lover.",
    img: "/images/alice.jpg", // Place this in public/images/
  },
  {
    name: "Ben",
    age: 29,
    bio: "Tech nerd who loves cooking and photography.",
    img: "/images/ben.jpg",
  },
  {
    name: "Chloe",
    age: 24,
    bio: "Dog mum. Music lover. Adventurer.",
    img: "/images/chloe.jpg",
  },
];

export default function TinderStyleApp() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(5); // Default to “unsure”

  const handleNext = () => {
    const { name } = profiles[index];
    console.log(`Rated ${name} with score ${score}`);

    // TODO: Persist the rating to your backend / Firestore / Supabase etc.

    // Move to next profile (loops when reaching the end)
    setIndex((prev) => (prev + 1 < profiles.length ? prev + 1 : 0));
    setScore(5); // Reset slider to centre
  };

  const currentProfile = profiles[index];

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-80 text-center">
        {/* Profile image */}
        <img
          src={currentProfile.img}
          alt={currentProfile.name}
          className="rounded-xl w-full h-64 object-cover mb-4"
        />

        {/* Name, age & bio */}
        <h2 className="text-xl font-semibold">
          {currentProfile.name}, {currentProfile.age}
        </h2>
        <p className="text-gray-600 text-sm mb-6">{currentProfile.bio}</p>

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
          className="w-full accent-pink-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1 mb-6">
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
      </div>
    </div>
  );
}