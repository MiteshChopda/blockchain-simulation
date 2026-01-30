
import { useEffect, useState } from "react";
import { sha256 } from "../utils/hash";
import { mineBlock } from "../utils/mineBlock";

const DIFFICULTY = 4;

export default function Block() {
  const [blockNo, setBlockNo] = useState<number>(1);
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  // Recompute hash when inputs change (non-mining)
  useEffect(() => {
    const computeHash = async () => {
      const input = `${blockNo}${nonce}${data}`;
      const result = await sha256(input);
      setHash(result);
    };

    computeHash();
  }, [blockNo, nonce, data]);

  const handleMine = async () => {
    const result = await mineBlock(
      blockNo,
      data,
      DIFFICULTY,
      nonce
    );

    setNonce(result.nonce);
    setHash(result.hash);
  };

  return (
    <div className="flex flex-col rounded-sm p-4 m-auto max-w-md">
      <h1 className="self-center font-bold mb-4">Block</h1>

      <div className="flex flex-col gap-3">
        <label>
          Block No:
          <input
            type="number"
            value={blockNo}
            onChange={(e) => setBlockNo(Number(e.target.value))}
            className="w-full bg-amber-50 border-2 p-2 border-gray-400 rounded-xl"
          />
        </label>

        <label>
          Nonce:
          <input
            type="number"
            value={nonce}
            onChange={(e) => setNonce(Number(e.target.value))}
            className="w-full bg-amber-50 border-2 p-2 border-gray-400 rounded-xl"
          />
        </label>

        <label>
          Data:
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-amber-50 border-2 p-2 border-gray-400 rounded-xl"
          />
        </label>

        <label>
          Hash:
          <input
            type="text"
            readOnly
            value={hash}
            className="w-full bg-amber-50 border-2 p-2 border-gray-400 rounded-xl font-mono text-xs"
          />
        </label>

        <button
          onClick={handleMine}
          className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl"
        >
          Mine Block
        </button>

        <p className="text-xs text-gray-600 text-center">
          Difficulty: {DIFFICULTY} leading zeros
        </p>
      </div>
    </div>
  );
}

