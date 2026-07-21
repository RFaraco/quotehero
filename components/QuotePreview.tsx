"use client"; 
import { forwardRef, useState } from "react";
import Image from "next/image";
import { Proposal, Contractor } from "@/types/proposal";
import { supabase } from "@/lib/supabase";



type QuotePreviewProps = {
  proposal: Proposal;
  setProposal: React.Dispatch<React.SetStateAction<Proposal | null>>;
  contractor: Contractor;
  onDownloadPdf: () => void;   
  leadId: number | null;
};

const QuotePreview = forwardRef<HTMLDivElement, QuotePreviewProps>(({
  proposal,
  setProposal,
  contractor,
  onDownloadPdf,
  leadId,
}: QuotePreviewProps, ref) => {

  console.log("QuotePreview leadId:", leadId);

const editedProposal = {
  ...proposal,
  scope: Array.isArray(proposal.scope)
    ? proposal.scope.map(item => `- ${item}`).join("\n")
    : proposal.scope,
};
  const today = new Date();

  const validUntil = new Date(today);
  validUntil.setDate(today.getDate() + 30);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",

    });

  const {
      customerName,
      projectSummary,
      scope,
      price,
      timeline,
    } = editedProposal;

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [savedTime, setSavedTime] = useState("");
  const [wouldUseAgain, setWouldUseAgain] = useState("");

  return (
  <main className="min-h-screen bg-[#9B82FF] py-8 sm:py-10 lg:py-12">

    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
          ref={ref}
          className="overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
        {/* ========================= HEADER ========================= */}

        <header className="border-b border-gray-100 bg-white px-6 py-6 sm:px-8 lg:px-12">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT */}

            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Image
                src="/logo.png"
                alt="QuoteHero"
                width={170}
                height={70}
                priority
                className="h-auto w-40 lg:w-44 object-contain"
              />

              <p className="mt-2 text-sm text-gray-500">
                Professional Service Proposal
              </p>

            </div>

            {/* RIGHT */}

            <div className="w-full rounded-3xl border border-gray-200 bg-gray-50 p-6">

              <p className="text-xl font-bold text-gray-900">
                Proposal #QH-00000
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between">

                  <span className="text-sm uppercase tracking-wider text-gray-500">
                    Prepared
                  </span>

                  <span className="font-semibold text-gray-800">
                    {formatDate(today)}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm uppercase tracking-wider text-gray-500">
                    Valid Until
                  </span>

                  <span className="font-semibold text-gray-800">
                    {formatDate(validUntil)}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </header>
        {/* BODY */}

        <div className="p-6 sm:p-8 lg:p-12 space-y-10">

          {/* PREPARED FOR */}

          <section>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Prepared For
            </p>

            <input
              type="text"
              value={editedProposal.customerName}
              onChange={(e) =>
                setProposal({
                  ...proposal,
                  customerName: e.target.value,
                })
              }
              className="mt-3 w-full bg-transparent text-4xl font-bold text-gray-900 outline-none border-b-2 border-transparent focus:border-yellow-400"
            />

          </section>

          {/* PROJECT SUMMARY */}

          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-5 md:p-8">

            <h3 className="text-xl font-semibold text-gray-900">
              Project Summary
            </h3>

            <textarea
              value={editedProposal.projectSummary}
              onChange={(e) =>
                setProposal({
                  ...proposal,
                  projectSummary: e.target.value,
                })
              }
              rows={4}
              className="mt-4 w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-base leading-6 md:leading-7 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-100"
              />
          </section>

          {/* SCOPE + INVESTMENT */}

          <section className="grid gap-5 md:gap-8 lg:grid-cols-3">

            {/* LEFT */}

            <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white p-5 md:p-8 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-900">
              Scope of Work
            </h3>

            <textarea
              value={editedProposal.scope}
              onChange={(e) =>
                setProposal({
                  ...proposal,
                  scope: e.target.value
                .split("\n")
                .map((line) => line.replace(/^-\s*/, "").trim())
                .filter((line) => line.length > 0),
                })
              }
              rows={8}
              className="mt-4 md:mt-8 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-5 text-base md:text-[17px] leading-6 md:leading-8 outline-none transition-all focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
              placeholder={`- Prepare all surfaces
                            - Repair drywall where needed
                            - Apply primer
                            - Apply two coats of premium paint
                            - Final cleanup`
                          }
            />
          </div>
                {/* RIGHT */}

            <div className="rounded-3xl bg-[#4D3E5C] p-8 text-white shadow-lg flex flex-col">

              <p className="text-sm uppercase tracking-[0.25em] text-purple-200">
                Investment
              </p>

              <p className="mt-3 text-purple-200">
                Fixed Price
              </p>

              <input
                type="text"
                value={editedProposal.price}
                onChange={(e) =>
                  setProposal({
                    ...proposal,
                    price: e.target.value,
                  })
                }
                className="mt-5 w-full bg-transparent text-6xl font-bold text-white outline-none border-b-2 border-transparent focus:border-yellow-400"
              />

              <div className="mt-10 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white/80">
                  Estimated Timeline
                </h3>

                <textarea
                  value={editedProposal.timeline}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      timeline: e.target.value,
                    })
                  }
                  rows={6}
                  className="mt-4 w-full min-h-[160px] resize-none rounded-xl border border-transparent bg-white/5 p-4 text-base font-medium leading-6 text-white outline-none transition-all focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30"                />
              </div>

            </div>

          </section>




          {/* ========================= NEXT STEP ========================= */}

          <footer className="rounded-3xl bg-[#4D3E5C] p-10 text-white">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">
                Proposal Ready
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                Your proposal is ready.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-purple-100">
                Review your proposal one last time. When you're ready, download the PDF and send it to your customer.
              </p>

              <div className="mt-10">

                
                <button
                  onClick={async () => {
                    if (leadId) {
                      const { error } = await supabase
                        .from("leads")
                        .update({
                          pdf_downloaded: true,
                          pdf_downloaded_at: new Date().toISOString(),
                        })
                        .eq("id", leadId);

                      if (error) {
                        console.error(error);
                      }
                    }

                    setShowFeedbackModal(true);
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-10 py-5 text-lg font-bold text-gray-900 shadow-xl transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl"
                >
                  Download PDF
                </button>
              </div>
              
              {showFeedbackModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

                  <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">


                    <div className="mt-4 flex justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
                    </div>
                    
                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                      Generating your PDF...
                    </h2>

                    <p className="mt-2 text-gray-600">
                      Please answer two quick questions while we prepare your PDF.
                    </p>

                    <div className="mt-8">

                      <p className="font-semibold text-gray-900">
                        Did QuoteHero save you time?
                      </p>

                        <div className="mt-4 space-y-2 text-left text-gray-800">

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="savedTime"
                              value="Yes"
                              checked={savedTime === "Yes"}
                              onChange={(e) => setSavedTime(e.target.value)}
                            />
                            Yes
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="savedTime"
                              value="A little"
                              checked={savedTime === "A little"}
                              onChange={(e) => setSavedTime(e.target.value)}
                            />
                            A little
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="savedTime"
                              value="No"
                              checked={savedTime === "No"}
                              onChange={(e) => setSavedTime(e.target.value)}
                            />
                            No
                          </label>

                        </div>

                    </div>

                    <div className="mt-8">

                      <p className="font-semibold text-gray-900">
                        Would you like Early Access with exclusive bonuses?
                      </p>

                      <div className="mt-4 space-y-2 text-left text-gray-800">

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="earlyAccess"
                            value="Yes"
                            checked={wouldUseAgain === "Yes"}
                            onChange={(e) => setWouldUseAgain(e.target.value)}
                          />
                          Yes
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="earlyAccess"
                            value="Maybe"
                            checked={wouldUseAgain === "Maybe"}
                            onChange={(e) => setWouldUseAgain(e.target.value)}
                          />
                          Maybe
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="earlyAccess"
                            value="No"
                            checked={wouldUseAgain === "No"}
                            onChange={(e) => setWouldUseAgain(e.target.value)}
                          />
                          No
                        </label>

                      </div>
                    </div>

                    <button
                      disabled={!savedTime || !wouldUseAgain}
                      className="mt-10 w-full rounded-xl bg-yellow-400 p-4 font-semibold disabled:opacity-40"
                      onClick={async () => {

                        if (leadId) {

                          const { error } = await supabase
                            .from("leads")
                            .update({
                              saved_time: savedTime,
                              early_access: wouldUseAgain,
                            })
                            .eq("id", leadId)
                            .select();

                            console.log("LeadId:", leadId);
                            console.log("Error:", error);
                        }

                        setShowFeedbackModal(false);

                        onDownloadPdf();

                      }}
                    >
                      Continue & Download PDF
                    </button>
                  </div>

                </div>
              )}

              <div className="my-12 h-px bg-white/15" />

              {/* CONTACT */}

              <div className="grid gap-8 text-left sm:grid-cols-3">

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-purple-200">
                    Contractor
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {contractor.name}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-purple-200">
                    Phone
                  </p>

                  <p className="mt-2 text-lg font-medium break-all">
                    {contractor.phone}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-purple-200">
                    Email
                  </p>

                  <p className="mt-2 text-lg font-medium break-all">
                   {contractor.email}
                  </p>

                </div>

              </div>

            </div>

          </footer>
        </div>

      </div>

    </div>

  </main>

 )

});

QuotePreview.displayName = "QuotePreview";

export default QuotePreview;
