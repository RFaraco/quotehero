export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to QuoteHero
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Let's generate your first professional quote.
        </p>

        <button
          className="mt-10 w-full rounded-xl bg-yellow-400 px-6 py-4 text-lg font-semibold text-black hover:bg-yellow-500 transition"
        >
          Get Started
        </button>

      </div>
    </main>
  );
}