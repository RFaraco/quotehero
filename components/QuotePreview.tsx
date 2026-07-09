type QuotePreviewProps = {
  customerName: string;
  projectSummary: string;
  scope: string[];
  price: string;
  timeline: string;
};

export default function QuotePreview({
  customerName,
  projectSummary,
  scope,
  price,
  timeline,
}: QuotePreviewProps) {
  return (
    <main className="min-h-screen bg-[#3A1E68] flex items-center justify-center p-6">

      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#3A1E68] to-[#5A2E98] text-white p-8 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              QuoteHero
            </h1>

            <p className="text-purple-200 mt-1">
              Professional Service Quote
            </p>

          </div>

          <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold">
            ✓ AI Generated
          </div>

        </div>

        <div className="p-10">

          {/* Customer */}

          <section>

            <p className="text-xs uppercase tracking-widest text-gray-400">
              Prepared For
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {customerName}
            </h2>

            <p className="mt-1 text-gray-500">
              Quote Date • July 9, 2026
            </p>

          </section>

          {/* Summary */}

          <section className="mt-10">

            <h3 className="font-bold text-xl">
              Project Summary
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              {projectSummary}
            </p>

          </section>

          {/* Scope */}

          <section className="mt-10">

            <h3 className="font-bold text-xl">
              Scope of Work
            </h3>

            <div className="mt-5 space-y-3">

              {scope.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center text-sm">
                    ✓
                  </div>

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </section>

          {/* Price */}

          <section className="mt-12 rounded-2xl bg-yellow-50 border border-yellow-200 p-8">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Fixed Price
                </p>

                <h2 className="text-5xl font-bold mt-2">
                  {price}
                </h2>

              </div>

              <div className="text-right">

                <p className="text-gray-500">
                  Timeline
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {timeline}
                </h3>

              </div>

            </div>

          </section>

          {/* Terms */}

          <section className="mt-10">

            <h3 className="font-bold text-xl">
              Terms
            </h3>

            <ul className="mt-4 space-y-2 text-gray-600">

              <li>• Quote valid for 30 days</li>

              <li>• Payment upon completion</li>

              <li>• Materials included unless noted otherwise</li>

            </ul>

          </section>

          {/* Buttons */}

          <div className="mt-12 flex gap-4">

            <button className="flex-1 rounded-xl border border-gray-300 py-4 font-semibold hover:bg-gray-50">

              Download PDF

            </button>

            <button className="flex-1 rounded-xl bg-yellow-400 py-4 font-semibold hover:bg-yellow-500">

              Create Another Quote

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}