"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [customerRequest, setCustomerRequest] = useState("");
  const [trade, setTrade] = useState("");

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">

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
              className="mt-10 w-full rounded-xl bg-yellow-400 px-6 py-4 text-lg font-semibold text-black hover:bg-yellow-500 transition"
            >
              Get Started
            </button>

          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div>

            <p className="text-sm font-semibold text-yellow-500">
              STEP 1 OF 4
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Paste your customer's request
            </h2>

            <p className="mt-3 text-gray-600">
              Copy and paste the message your customer sent you.
            </p>

            <textarea
              value={customerRequest}
              onChange={(e) => setCustomerRequest(e.target.value)}
              className="mt-8 h-48 w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Hi, I need my living room painted before next Friday..."
            />

            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold hover:bg-yellow-500 transition"
            >
              Continue
            </button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>

            <p className="text-sm font-semibold text-yellow-500">
              STEP 2 OF 4
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              What kind of work is this quote for?
            </h2>

            <p className="mt-3 text-gray-600">
              Select the trade that best matches this job.
            </p>

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
              onClick={() =>
                alert(
                  `Customer Request:\n\n${customerRequest}\n\nTrade: ${trade}`
                )
              }
              disabled={!trade}
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold disabled:opacity-40 hover:bg-yellow-500 transition"
            >
              Continue
            </button>

          </div>
        )}

      </div>
    </main>
  );
}