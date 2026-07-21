"use client";

import { supabase } from "@/lib/supabase";
import QuotePreview from "@/components/QuotePreview";
import type { Proposal } from "@/types/proposal"; 
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import QuotePdf from "@/components/QuotePdf";
import { LoaderCircle } from "lucide-react";


export default function OnboardingPage() {

  const proposalRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [leadId, setLeadId] = useState<number | null>(null);

  const [step, setStep] = useState(0);

  const [customerRequest, setCustomerRequest] = useState("");
  const [trade, setTrade] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");

  const [pricingType, setPricingType] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<Proposal | null>(null);
  const [editedProposal, setEditedProposal] = useState<Proposal | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [savedTime, setSavedTime] = useState("");
  const [wouldUseAgain, setWouldUseAgain] = useState("");
  
  const scopeTemplates: Record<string, string[]> = {
    Painter: [
      "Protect furniture and flooring",
      "Prepare all wall surfaces",
      "Repair minor surface imperfections",
      "Apply two premium paint coats",
      "Final inspection and cleanup",
    ],

    Cleaner: [
      "Vacuum all floors",
      "Mop hard surfaces",
      "Clean bathrooms",
      "Clean kitchen surfaces",
      "Dust furniture and fixtures",
      "Final walkthrough",
    ],

    Electrician: [
      "Inspect electrical system",
      "Install or replace requested fixtures",
      "Test all electrical connections",
      "Verify safety compliance",
      "Clean work area",
    ],

    Plumber: [
      "Inspect plumbing system",
      "Replace damaged components",
      "Pressure and leak testing",
      "Verify proper operation",
      "Clean work area",
    ],

    HVAC: [
      "Inspect HVAC system",
      "Replace filters if required",
      "Test heating and cooling",
      "Verify airflow",
      "Clean work area",
    ],

    Landscaper: [
      "Prepare outdoor areas",
      "Trim plants and shrubs",
      "Mow lawn",
      "Remove debris",
      "Final cleanup",
    ],
  };

  const timelineTemplates: Record<string, string> = {
    Painter: "2–3 Working Days",
    Cleaner: "1 Working Day",
    Electrician: "1 Working Day",
    Plumber: "1 Working Day",
    HVAC: "2 Working Days",
    Landscaper: "2 Working Days",
  };


const proposal: Proposal = {
  customerName: "Customer",

  projectSummary:
    customerRequest || "No project description was provided.",

  scope:
    scopeTemplates[trade] ?? [
      "Professional service",
    ],

  price:
    pricingType === "fixed"
      ? `$${fixedPrice || "0"}`
      : `$${(
          Number(hourlyRate || 0) *
          Number(estimatedHours || 0)
        ).toFixed(2)}`,

  timeline:
    timelineTemplates[trade] ??
    "To Be Scheduled",
};

const handlePrint = useReactToPrint({
  contentRef: pdfRef,
  documentTitle: `Quote-${contractorName}`,
});

const contractor = {
  name: contractorName || "Your Name",
  phone: "",
  email: contractorEmail || "your@email.com",
};

if (step === 5 && generatedProposal) {
  return (
    <main className="min-h-screen bg-[#9B82FF] py-8">
      <div className="mx-auto max-w-6xl px-6">

        <QuotePreview
          ref={proposalRef}
          proposal={editedProposal ?? generatedProposal ?? proposal}
          setProposal={setEditedProposal}
          contractor={contractor}
          onDownloadPdf={handlePrint}
          leadId={leadId}
        />

        <div className="hidden">
          <QuotePdf
            ref={pdfRef}
            proposal={editedProposal ?? generatedProposal ?? proposal}
            contractor={contractor}
          />
        </div>
        
      </div>

    </main>
  );
}

  if (loading) {
    return (
      <main className="min-h-screen bg-[#9B82FF] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full">

          <div className="flex justify-center mb-8">
            <LoaderCircle
              size={64}
              className="animate-spin text-yellow-400"
            />
          </div>
          <h2 className="text-3xl font-bold">
            Generating your proposal...
          </h2>

          <div className="mt-8 space-y-3 text-gray-600">

            <p>✓ Reading customer request</p>

            <p>✓ Understanding project</p>

            <p>✓ Writing professional proposal</p>

            <p>✓ Preparing proposal...</p>

          </div>

        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#9B82FF] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-3xl bg-white p-10 shadow-2xl">

        {step > 0 && step < 5 && (
          <div className="mb-8">

            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {step} of 4</span>
              <span>{step * 25}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${step * 25}%` }}
              />
            </div>

          </div>
        )}

        {/* STEP 0 */}

        {step === 0 && (
          <div className="text-center">

            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to QuoteHero
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Let's generate your first professional quote.
            </p>

            <button
              onClick={() => setStep(1)}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
            >
              Get Started
            </button>

          </div>
        )}

        {/* STEP 1 */}

        {step === 1 && (
          <div>


            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Enter the customer's request
            </h2>

            <p className="mt-3 text-gray-600">
              Describe the work the customer needs.
            </p>

            <textarea
              value={customerRequest}
              onChange={(e) => setCustomerRequest(e.target.value)}
              className="mt-8 h-48 w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Hi, I need my living room painted before next Friday..."
            />

            <button
              onClick={() => setStep(2)}
              disabled={!customerRequest}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
            >
              Continue
            </button>

          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              What kind of work is this quote for?
            </h2>

            <div className="mt-8 space-y-3">

              {[
                "Painter",
                "Electrician",
                "Plumber",
                "Cleaner",
                "HVAC",
                "Landscaper",
                "Other",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setTrade(item)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    trade === item
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-300 hover:border-yellow-300"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!trade}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
            >
              Continue
            </button>

          </div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <div>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              How would you like to price this job?
            </h2>

            <div className="mt-8 space-y-3">

              <button
                onClick={() => setPricingType("fixed")}
                className={`w-full rounded-xl border p-4 text-left ${
                  pricingType === "fixed"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                Fixed Price
              </button>

              <button
                onClick={() => setPricingType("hourly")}
                className={`w-full rounded-xl border p-4 text-left ${
                  pricingType === "hourly"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                Hourly
              </button>

            </div>

            {pricingType === "fixed" && (

              <input
                type="number"
                placeholder="Project Price ($)"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(e.target.value)}
                className="mt-8 w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />

            )}

            {pricingType === "hourly" && (

              <div className="mt-8 space-y-4">

                <input
                  type="number"
                  placeholder="Hourly Rate ($)"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="Estimated Hours"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />

              </div>

            )}

            <button
              onClick={() => setStep(4)}
              disabled={
                (pricingType === "fixed" && !fixedPrice) ||
                (pricingType === "hourly" &&
                  (!hourlyRate || !estimatedHours))
              }
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
            >
              Continue
            </button>

          </div>
        )}

        {/* STEP 4 */}

        {step === 4 && (
          <div className="text-center">

            <p className="text-sm font-semibold text-yellow-500">
              STEP 4 OF 4
            </p>

            <h2 className="mt-4 text-3xl font-bold">
                Almost done!
            </h2>

            <p className="mt-4 text-gray-600">
              Enter your details below and we'll generate your free AI-powered proposal in seconds.
            </p>

          <div className="mt-8 space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                value={contractorName}
                onChange={(e) => setContractorName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={contractorEmail}
                onChange={(e) => setContractorEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />

          </div>

            <button
              disabled={!contractorName || !contractorEmail}
              onClick={async () => {
                setLoading(true);

                try {
                  const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      customerRequest,
                      trade,
                      pricingType,
                      fixedPrice,
                      hourlyRate,
                      estimatedHours,
                    }),
                  });

                  const data = await response.json();

                  console.log(data);

                  // transforma o texto JSON retornado pelo GPT em objeto
                  const ai = JSON.parse(data.result);

                  const proposal = {
                    customerName: "Customer",

                    projectSummary: ai.projectSummary,

                    scope: ai.scope,

                    price:
                      pricingType === "fixed"
                        ? `$${fixedPrice}`
                        : `$${Number(hourlyRate) * Number(estimatedHours)}`,

                    timeline: ai.timeline,
                  };

                  setGeneratedProposal(proposal);
                  setEditedProposal(proposal);

                  const { data: leadData, error: leadError } = await supabase
                    .from("leads")
                    .insert({
                      contractor_name: contractorName,
                      contractor_email: contractorEmail,
                      trade,
                      pricing_type: pricingType,
                      fixed_price: fixedPrice,
                      hourly_rate: hourlyRate,
                      estimated_hours: estimatedHours,
                      customer_request: customerRequest,
                      proposal_generated: true,
                      ai_model: "gpt-5",
                      app_version: "MVP-1",
                    })
                    .select()
                    .single();
                  console.log("LEAD:", leadData);
                  console.log("ERROR:", leadError);
                  if (leadData) {
                      setLeadId(leadData.id);
                  }

                  setLoading(false);
                  setStep(5);

                } catch (err) {
                  console.error(err);
                  setLoading(false);
                }
              }}
              className="mt-10 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
              >
              Generate My Proposal
            </button>

          </div>
        )}

      </div>

    </main>
  );
}