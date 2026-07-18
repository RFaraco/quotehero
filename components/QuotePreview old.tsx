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
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(today.getDate() + 30);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="min-h-screen bg-[#4D3E5C] py-10 px-4">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <header className="border-b border-gray-200 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-xl font-bold">QH</div>
              <div>
                <h1 className="text-2xl font-bold">QuoteHero</h1>
                <p className="text-gray-500">Professional Service Proposal</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">Proposal #QH-000123</p>
              <p>Prepared: {fmt(today)}</p>
              <p>Valid Until: {fmt(validUntil)}</p>
            </div>
          </div>
        </header>

        <div className="p-10">
          <section>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Prepared For</p>
            <h2 className="mt-2 text-3xl font-bold">{customerName}</h2>
          </section>

          <section className="mt-10">
            <p>Hi <strong>{customerName.split(" ")[0]}</strong>,</p>
            <p className="mt-4 text-gray-700 leading-8">
              Thank you for the opportunity to provide a proposal for your project.
            </p>
            <p className="text-gray-700 leading-8">
              Based on your request, we've prepared the following scope of work.
            </p>
          </section>

          <section className="mt-12 border-t pt-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500">Project Understanding</h3>
            <p className="mt-5 leading-8 text-gray-700">{projectSummary}</p>
          </section>

          <section className="mt-12 border-t pt-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500">Scope of Work</h3>
            <div className="mt-6 space-y-4">
              {scope.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t pt-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500">What's Included</h3>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {["Professional labour","Standard materials","Surface preparation","Site protection","Complete cleanup","Final walkthrough"].map((item)=>(
                <div key={item} className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl bg-[#F8F6FB] border p-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500">Investment</h3>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-gray-500">Fixed Price</p>
                <p className="text-5xl font-bold text-[#4D3E5C] mt-2">{price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Timeline</p>
                <p className="font-semibold mt-2">{timeline}</p>
              </div>
            </div>
          </section>

          <section className="mt-12 border-t pt-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500">Terms</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Proposal valid for 30 days.</li>
              <li>• Changes to project scope may affect pricing.</li>
              <li>• Payment terms as agreed.</li>
            </ul>
          </section>

          <section className="mt-12 rounded-2xl bg-yellow-50 p-8">
            <h3 className="text-xl font-bold">Ready to move forward?</h3>
            <p className="mt-3 text-gray-700">
              Reply to this proposal and we'll schedule your project.
            </p>
          </section>

          <div className="mt-12 flex gap-4">
            <button className="flex-1 rounded-xl border py-4 font-semibold">Edit Proposal</button>
            <button className="flex-1 rounded-xl bg-yellow-400 py-4 font-semibold hover:bg-yellow-500">Download PDF</button>
          </div>
        </div>
      </div>
    </main>
  );
}
