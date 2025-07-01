import { useNavigate } from "react-router-dom";

export default function DebriefPage() {
  const navigate = useNavigate();

  // Optional: allow restarting the study
  // const restart = () => navigate("/", { replace: true });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl space-y-6 leading-relaxed">
        {/* Project Title & Researcher */}
        <h1 className="text-2xl font-bold text-center">Project title: AI-Driven Fake Profile Detection in Online Dating Platforms Using Reverse Image Lookup and Text-Based Analysis</h1>
        <p className="font-semibold text-center">Researcher name(s): Graeme Moir</p>

        {/* Thank you and Nature of Research */}
        <p>
          Thank you for taking part in this research project; your contribution is valuable.
        </p>
        <h2 className="font-semibold">Nature of Research</h2>
        <p>
          This study aimed to understand how easily a typical user can distinguish between real and AI-generated dating profiles. We asked you to review 30 profiles and classify each as real or AI-generated. Your participation helps us evaluate the effectiveness of visual and textual cues in identifying synthetic content.
        </p>

        {/* Data
        <h2 className="font-semibold">Data</h2>
        <p>
          Your data will be stored, shared, and processed as outlined in the Participant Information Sheet and Consent Form (Approval Code#). If you no longer wish to participate, you may withdraw your data until <strong>01/08/2025</strong>. After anonymisation, we cannot identify or remove your specific data.
        </p> */}

        {/* Sources of Support */}
        <h2 className="font-semibold">Sources of support</h2>
        <p>
          If taking part in the research has raised any issues for you personally, you can contact Student Counselling at{' '}
          <a
            href="https://www.abertay.ac.uk/life/student-support-and-services/counselling/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Abertay Student Counselling
          </a>
          . Non-students may also seek support from your GP, Samaritans (<a href="https://www.samaritans.org/" className="text-blue-600 underline hover:text-blue-800">https://www.samaritans.org/</a>), or Childline if under 18.
        </p>

        {/* Further Reading */}
        <h2 className="font-semibold">Further reading</h2>
        <p>
          If you wish to learn more about AI image/text analysis and online safety, visit our project page or explore these resources:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li>
            OpenAI blog: <a href="https://openai.com/blog/" className="text-blue-600 underline hover:text-blue-800">https://openai.com/blog/</a>
          </li>
          <li>
            Abertay University Research Portal: <a href="https://www.abertay.ac.uk/research/" className="text-blue-600 underline hover:text-blue-800">https://www.abertay.ac.uk/research/</a>
          </li>
        </ul>

        {/* Contact */}
        <h2 className="font-semibold">Contact</h2>
        <p>
          For any further questions, you may contact the researcher or supervisor at{' '}
          <a href="mailto:2404561@uad.ac.uk" className="text-blue-600 underline hover:text-blue-800">
            2404561@uad.ac.uk
          </a>
          .
        </p>

        <p>Thank you once again for taking part in the research!</p>
        <p>You can now close the browser.</p>

        {/* Restart Button
        <button
          onClick={restart}
          className="mt-4 w-full py-3 rounded-full font-medium bg-pink-600 text-white hover:bg-pink-700 transition"
        >
          Start Again
        </button> */}
      </div>
    </div>
  );
}
// This component serves as the debrief page for participants after completing the study.
// It provides information about the study, data handling, sources of support, and further reading.   