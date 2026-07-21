"use client"; 
import { forwardRef } from "react";
import Image from "next/image";
import { Proposal, Contractor } from "@/types/proposal";



type QuotePdfProps = {
  proposal: Proposal;
  contractor: Contractor;
};

const QuotePdf = forwardRef<HTMLDivElement, QuotePdfProps>(({
  proposal,
  contractor,
}: QuotePdfProps, ref) => {

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
    } = proposal;

  return (

    <div ref={ref} className="bg-white">

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

            <div className="w-full lg:w-[340px] rounded-2xl border border-gray-200 bg-gray-50 p-6">

              <p className="text-xl font-bold text-gray-900">
                Proposal #QH-000123
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

            <div className="mt-3 text-4xl font-bold text-gray-900">
            {customerName}
            </div>

          </section>

          {/* PROJECT SUMMARY */}

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-8">

            <h3 className="text-xl font-semibold text-gray-900">
              Project Summary
            </h3>

            <div className="whitespace-pre-wrap text-gray-700">
                {projectSummary}
            </div>
          </section>

          {/* SCOPE + INVESTMENT */}

          <section className="grid gap-8 lg:grid-cols-3">

            {/* LEFT */}

          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-8">

            <h3 className="text-xl font-semibold text-gray-900">
              Scope of Work
            </h3>

            <ul className="mt-4 space-y-2">
            {scope.map((item, index) => (
                <li key={index} className="text-gray-700">
                • {item}
                </li>
            ))}
            </ul>

          </div>
                {/* RIGHT */}

            <div className="rounded-2xl bg-[#4D3E5C] p-8 text-white shadow-lg flex flex-col">

              <p className="text-sm uppercase tracking-[0.25em] text-purple-200">
                Investment
              </p>

              <p className="mt-3 text-purple-200">
                Fixed Price
              </p>

            <div className="mt-5 text-6xl font-bold text-white">
            {price}
            </div>

              <div className="mt-10 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white/80">
                  Estimated Timeline
                </h3>

                <div className="whitespace-pre-wrap text-purple-100">
                    {timeline}
                </div>
              </div>

            </div>

          </section>




          {/* ========================= NEXT STEP ========================= */}

        <footer className="rounded-3xl bg-[#4D3E5C] p-10 text-white">

        <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">
            Thank You for the Opportunity
            </p>

            <h2 className="mt-4 text-4xl font-bold">
            We look forward to working with you.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-purple-100">
            Thank you for considering us for your project.
            <br />
            If you have any questions or would like to discuss any aspect of this proposal,
            please feel free to contact us.
            </p>

            <div className="my-12 h-px bg-white/15" />

            <div className="text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-purple-200">
                Prepared by
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
                {contractor.name}
            </h3>

            <p className="mt-2 text-purple-100">
                {contractor.email}
            </p>

            </div>

        </div>

        </footer>
        </div>

      </div>

    </div>

  </div>

 )

});

QuotePdf.displayName = "QuotePdf";

export default QuotePdf;
