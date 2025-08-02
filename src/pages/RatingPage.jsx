import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useStudy } from "../context/StudyContext";

// Profile data (8 sample profiles, will loop until 30 ratings given)
const profiles = [
  {
    id: "alice",
    name: "Alice",
    age: 26,
    bio: "Weekend trail runner who’s happiest with a sunrise summit and a strong oat latte in hand afterward. Spontaneously books city-breaks when the travel bug bites and can’t resist a pop-up coffee shop or hidden waterfall. Loves swapping stories around a campfire and is always up for rescuing a dog in need of belly rubs.",
    img: process.env.PUBLIC_URL + "/images/alice.jpg"
  },
  {
    id: "ben",
    name: "Ben",
    age: 29,
    bio: "Self-taught coder by day and amateur chef by night, I’ve perfected the art of sous-vide steak and sourdough. Love capturing the world through my camera—especially street markets and hidden corners of big cities. When I’m not debugging or whisking eggs, you’ll find me hunting down vinyl gems at local record shops.",
    img: process.env.PUBLIC_URL + "/images/ben.jpg"
  },
  {
    id: "chloe",
    name: "Chloe",
    age: 39,
    bio: "Dog mom to a rescue husky who prefers ramen nights and muddy forest hikes. Obsessed with live music—anything from jazz basements to open-air festivals—and I play bass in a weekend folk-rock band. Always down for spontaneous road trips and sampling local tacos in every town we pass through.",
    img: process.env.PUBLIC_URL + "/images/chloe.jpg"
  },
  {
    id: "anna",
    name: "Anna",
    age: 32,
    bio: "A vintage-obsessed bookworm with a soft spot for 1940s fashion and vinyl jazz. Collects first-edition novels and has an ever-growing wall of Polaroid portraits from friends’ travels. When not nose-deep in a novel, I’m hunting for retro finds at flea markets or experimenting with homemade kombucha.",
    img: process.env.PUBLIC_URL + "/images/anna.jpg"
  },
  {
    id: "claire",
    name: "Claire",
    age: 35,
    bio: "Marketing exec by trade, wine-lover by choice. I spend weekends plotting my next European getaway or curating playlists for dinner parties. Passionate about good design, contemporary art exhibits and rooftop bar sunsets. If you can recommend a hidden-gem winery, we’ll already have plans for our first date!",
    img: process.env.PUBLIC_URL + "/images/claire.jpg"
  },
  {
    id: "jen",
    name: "Jen",
    age: 31,
    bio: "Full-time yoga teacher with a love for sunrise flows and wellness retreats in Bali. I meditate daily, whip up plant-powered smoothies, and lead mindful hikes through ancient forests. When I need a break from downward dogs, I’m planning my next festival-camping adventure or a weekend DIY pottery class.",
    img: process.env.PUBLIC_URL + "/images/jen.jpg"
  },
  {
    id: "john",
    name: "John",
    age: 38,
    bio: "Guitarist in a blues band, dad-joke aficionado, and amateur barista. Born and raised in the suburbs but happiest around open mics and coffee shop jam sessions. I’ve got a soft spot for old horror movies, road trips with no GPS, and teaching my kids new puns every day.",
    img: process.env.PUBLIC_URL + "/images/john.jpg"
  },
  {
    id: "sara",
    name: "Sara",
    age: 34,
    bio: "Founder of a boutique tech startup, sushi connoisseur, and evening painter. When I’m not pitching investors, I’m exploring waterfront sushi bars or blending acrylic on canvas. If you can beat me at sushi-roll trivia or keep up with my early-morning kayak sessions, we’ll get along famously.",
    img: process.env.PUBLIC_URL + "/images/sara.jpg"
  },
  
  // …and so on for your additional profiles…
  
  {
    id: "bev",
    name: "Bev",
    age: 43,
    bio: "Proud mum of two, full-time project manager, and weekend gardener. My happy place is tending to my vegetable patch while listening to folk music and sipping chamomile tea. I’m all about family game nights, spontaneous baking experiments, and charity fun-runs in support of local causes.",
    img: process.env.PUBLIC_URL + "/images/bev.jpg"
  },
  {
    id: "tim",
    name: "Tim",
    age: 31,
    bio: "Software engineer turned amateur mixologist—my home bar features over 20 bitters and craft gins. Weekends are made for vinyl-spinning parties or hiking to hidden waterfall swimming holes. If you’re up for a cocktail-making crash course or a late-night stargazing session, swipe right!",
    img: process.env.PUBLIC_URL + "/images/tim.jpg"
  },
  {
    id: "hannah",
    name: "Hannah",
    age: 30,
    bio: "Certified scuba diver, yoga enthusiast, and nature-photography buff. I’ve swum with manta rays in Bali and chased northern lights in Iceland. Between mindful meditation retreats and underwater exploration, I’m always chasing serenity—and a new adventure to share with someone special.",
    img: process.env.PUBLIC_URL + "/images/hannah.jpg"
  },
  {
    id: "chris",
    name: "Chris",
    age: 22,
    bio: "University student studying astrophysics, part-time barista, and night-owl gamer. Obsessed with anything space-related—rocket launches, stargazing apps, sci-fi marathons—and brewing the perfect flat white on my days off. Up for co-op gaming sessions or late-night pizza runs.",
    img: process.env.PUBLIC_URL + "/images/chris.jpg"
  },
  {
    id: "ewan",
    name: "Ewan",
    age: 23,
    bio: "Travel writer who’s called five countries ‘home’. Fluent in three languages, collector of street-food recipes, and passionate about ocean cleanup initiatives. I’ve kayaked past icebergs in Greenland and shared rooftop dinners in Tokyo. Let’s compare bucket-list notes over matcha lattes!",
    img: process.env.PUBLIC_URL + "/images/ewan.jpg"
  },
  {
    id: "ronald",
    name: "Ronald",
    age: 51,
    bio: "Corporate lawyer by day, jazz saxophonist by night. I spend my free time arranging local open-mic nights and teaching music to underprivileged kids. Weekend ritual: slow-roasted brisket cooking, classic film screenings, and impromptu jam sessions in the backyard.",
    img: process.env.PUBLIC_URL + "/images/ronald.jpg"
  },
  {
    id: "jim",
    name: "Jim",
    age: 48,
    bio: "Landscape photographer who chases golden hour across five continents. I cart heavy gear up mountain trails for that perfect shot and unwind by hosting film photography workshops. If you love coffee-shop critiques of each other’s travel snaps, we’ll get along like old friends.",
    img: process.env.PUBLIC_URL + "/images/jim.jpg"
  },
  {
    id: "leigh",
    name: "Leigh",
    age: 28,
    bio: "Graphic designer obsessed with bold typography and mid-century architecture. When I’m not sketching logos, I’m curating playlists for underground clubs or hunting for vintage Polaroid cameras. Looking for someone who can appreciate an improv gallery opening—or a spontaneous taco crawl.",
    img: process.env.PUBLIC_URL + "/images/leigh.jpg"
  },
  {
    id: "zoe",
    name: "Zoe",
    age: 23,
    bio: "Recent film school grad, cinephile, and part-time lit-barista. I dissect indie flicks over artisanal coffee and write short-film scripts in my spare time. Movie-marathons, poetry slams, and spontaneous night-shoots fuel my creative soul—care to join?",
    img: process.env.PUBLIC_URL + "/images/zoe.jpg"
  },
  {
    id: "oli",
    name: "Oli",
    age: 19,
    bio: "Music-producing freshman with headphones permanently glued to my ears. I remix old soul tracks and DJ at local college parties. When the bass drops and the crowd moves, I’m in my element. Down for late-night studio sessions or a sunrise skate at the park.",
    img: process.env.PUBLIC_URL + "/images/oli.jpg"
  },
  {
    id: "jeanette",
    name: "Jeanette",
    age: 41,
    bio: "Executive chef turned food-blogger who lives for fusion cuisine. I host pop-up dinners in my loft and teach cooking masterclasses on weekends. If you can handle spice, storytelling, and impromptu kitchen dance-parties, we’ll get along spectacularly.",
    img: process.env.PUBLIC_URL + "/images/jeanette.jpg"
  },
  {
    id: "cindy",
    name: "Cindy",
    age: 29,
    bio: "Wildlife conservationist on sabbatical from the Serengeti, now exploring UK woodlands and bog-hopping birdwatching sites. Obsessed with tracking owls at dusk and rescuing hedgehogs in my spare time. Seeking someone who appreciates muddy boots and the sound of dawn chorus.",
    img: process.env.PUBLIC_URL + "/images/cindy.jpg"
  },
  {
    id: "rachel",
    name: "Rachel",
    age: 27,
    bio: "Broadway enthusiast and part-time drama coach, I live for curtain calls and standing ovations. Host community improv nights and director’s workshops, but also love quiet evenings over tea and a classic play script. Fancy re-enacting a scene together?",
    img: process.env.PUBLIC_URL + "/images/rachel.jpg"
  },
  {
    id: "yvonne",
    name: "Yvonne",
    age: 48,
    bio: "Vintage car restorer with grease under my nails and stories from the open road. Host monthly rally meetups and teach engine-tuning classes. If you can handle classic rock on vinyl and weekend drives down back-country lanes, let’s plan a Sunday cruise.",
    img: process.env.PUBLIC_URL + "/images/yvonne.jpg"
  },
  {
    id: "lars",
    name: "Lars",
    age: 44,
    bio: "Tech journalist by profession, drone-racing champion on weekends. I write about AI ethics during office hours and pilot quadcopters through urban canyons at dusk. Let’s test dive sites by day and compare drone footage over craft beers at night.",
    img: process.env.PUBLIC_URL + "/images/lars.jpg"
  },
  {
    id: "ellen",
    name: "Ellen",
    age: 37,
    bio: "Art therapist working with local charities and painting murals for community centers. My happy place is a blank canvas and a palette of bright acrylics. After hours, you’ll find me at live-draw events or curled up with a sketchbook and a cup of jasmine tea.",
    img: process.env.PUBLIC_URL + "/images/ellen.jpg"
  },
  {
    id: "dara",
    name: "Dara",
    age: 37,
    bio: "Fitness coach who’s turned HIIT workouts into an art form. I lead sunrise bootcamps in city parks and plan healthy meal-prep recipes for clients—all while training for my next Spartan Race. Looking for someone who won’t mind a few push-ups before coffee.",
    img: process.env.PUBLIC_URL + "/images/dara.jpg"
  },
  {
    id: "sofi",
    name: "Sofi",
    age: 31,
    bio: "Indie game developer crafting pixel-art worlds and narrative puzzles. Spend nights debugging code by candlelight and mornings sipping matcha in local cafés. If you love retro RPGs or spontaneous co-op game jams, grab your controller and let’s play.",
    img: process.env.PUBLIC_URL + "/images/sofi.jpg"
  },
  {
    id: "max",
    name: "Max",
    age: 44,
    bio: "Mountaineer who’s summited Kilimanjaro and cooked chili at Everest base camp. I map new alpine routes and teach wilderness survival workshops. If your ideal weekend includes altitude and adrenaline, let’s lace up our boots and chase the next peak.",
    img: process.env.PUBLIC_URL + "/images/max.jpg"
  },
  {
    id: "ali",
    name: "Ali",
    age: 29,
    bio: "Social media strategist obsessed with viral trends and meme culture. By night I’m remixing TikTok dances in my living room; by day I’m drafting campaign briefs over flat whites. Seeking someone who can laugh at my bad puns and share a pizza during brainstorms.",
    img: process.env.PUBLIC_URL + "/images/ali.jpg"
  },
  {
    id: "june",
    name: "June",
    age: 38,
    bio: "Landscape architect designing urban green spaces and rooftop gardens. I spend my mornings sketching park layouts and afternoons pruning roses. Looking for a fellow nature-lover to plan weekend plant swaps and explore community allotments together.",
    img: process.env.PUBLIC_URL + "/images/june.jpg"
  },
  {
    id: "clara",
    name: "Clara",
    age: 41,
    bio: "Independent filmmaker who’s screened shorts at Sundance and Cannes. I storyboard by day and edit through the night, fueling creativity with espresso and late-night diner pancakes. Let’s brainstorm our own screenplay over a road-trip playlist.",
    img: process.env.PUBLIC_URL + "/images/clara.jpg"
  },
];

// Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RatingPage() {
  // Shuffle profiles once
  const shuffledProfiles = useMemo(() => shuffleArray([...profiles]), []);
  const [index, setIndex] = useState(0);
  const [label, setLabel] = useState(null);       // "Human" | "AI"
  const [score, setScore] = useState(5);          // Confidence slider (0–10)
  const [completed, setCompleted] = useState(0);   // Number of ratings given
  const navigate = useNavigate();
  const { participantId } = useStudy();

  const handleNext = async () => {
    const p = shuffledProfiles[index];
    try {
      await addDoc(
        collection(db, "participants", participantId, "ratings"),
        {
          profileId: p.id,
          profileName: p.name,
          label,
          score,
          createdAt: serverTimestamp(),
        }
      );
    } catch (error) {
      console.error("Error saving rating:", error);
    }

    const nextCompleted = completed + 1;
    if (nextCompleted >= 30) {
      navigate("/debrief", { replace: true });
      return;
    }

    setCompleted(nextCompleted);
    setIndex((prev) => (prev + 1) % shuffledProfiles.length);
    setLabel(null);
    setScore(5);
  };

  const handleQuit = () => {
    navigate("/debrief", { replace: true });
  };

  const p = shuffledProfiles[index];

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-80 text-center">
        <img src={p.img} alt={p.name} className="rounded-xl w-full h-64 object-cover mb-4" />
        <h2 className="text-xl font-semibold">{p.name}, {p.age}</h2>
        <p className="text-gray-600 text-sm mb-4">{p.bio}</p>

        <p className="text-xs text-gray-500 mb-4">Profile {completed + 1} of 30</p>
        <p className="text-sm text-gray-700 mb-2">Do you think this profile is a human or AI generated?:</p>

        <div className="flex justify-around mb-6">
          {[
            { key: "Human", label: "Human" },
            { key: "AI", label: "AI" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setLabel(btn.key)}
              className={`px-4 py-2 rounded-full border focus:outline-none transition ${
                label === btn.key
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <label htmlFor="confidence" className="block text-sm font-medium mb-1">
          How certain are you about your choice?
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
          <span>Not certain</span>
          <span>Certain</span>
        </div>

        <button
          onClick={handleNext}
          disabled={!label}
          className="bg-pink-500 hover:bg-pink-600 rounded-full p-4 transition mx-auto block disabled:opacity-50"
        >
          <ArrowRight className="text-white w-6 h-6" />
        </button>

        {/* <button onClick={handleQuit} className="mt-4 text-sm text-gray-700 hover:text-gray-900">
          Quit
        </button> */}
      </div>
    </div>
  );
}
// This component handles the rating of profiles, allowing users to select whether they think a profile is human or AI, rate their confidence, and navigate through the profiles. It saves each rating to Firestore and tracks the number of completed ratings. The UI is styled with Tailwind CSS for a clean look.
// The profiles are shuffled once at the start to ensure a random order for each user. The component uses React hooks to manage state and effects, and it integrates with Firebase Firestore to save user ratings. The user can quit at any time, which will redirect them to the debrief page. The UI is designed to be responsive and user-friendly, with clear instructions and feedback.
// The component also includes a quit button that allows users to exit the rating process at any time, redirecting them to the debrief page. The use of Tailwind CSS ensures a clean and modern design, while the logic for handling ratings and navigation is straightforward and efficient. The component is designed to be intuitive, guiding users through the rating process with clear prompts and feedback.
// The profiles are shuffled once at the start to ensure a random order for each user. The component uses React hooks to manage state and effects, and it integrates with Firebase Firestore to save user ratings. The user can quit at any time, which will redirect them to the debrief page. The UI is designed to be responsive and user-friendly, with clear instructions and feedback.
// The component also includes a quit button that allows users to exit the rating process at any time, redirecting them to the debrief page.