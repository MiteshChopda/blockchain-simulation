
export default function Landing() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Blockchain Playground
      </h1>

      <p className="max-w-2xl text-gray-600 mb-6">
        A minimal interactive demo to understand how hashing, blocks,
        mining, transactions, and chain validation work together in a
        blockchain system.
      </p>

      <div className="grid gap-3 text-sm text-gray-500">
        <span>• Explore SHA-256 hashing</span>
        <span>• Create and mine blocks</span>
        <span>• Observe chain validation in real time</span>
      </div>
    </div>
  );
}
