
import { useState } from "react";
import { mineBlock } from "../utils/mineBlock";

const DIFFICULTY = 4;
const GENESIS_PREV_HASH = "0".repeat(64);

export default function Block() {
  const [blockNo, setBlockNo] = useState<number>(1);
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [previousHash, setPreviousHash] = useState<string>(GENESIS_PREV_HASH);
  const [hash, setHash] = useState<string>("");

  const handleMine = async () => {
    const { nonce: minedNonce, hash: minedHash } =
      await mineBlock(
        blockNo,
        data,
        previousHash,
        DIFFICULTY,
        nonce
      );

    setNonce(minedNonce);
    setHash(minedHash);
  };

  return (
    <div className="flex flex-col rounded-sm p-4 m-auto max-w-md">
      <h1 className="text-center font-bold text-lg">
        Block (Difficulty: {DIFFICULTY})
      </h1>

      <div className="flex flex-col gap-3 text-sm">
        <label>
          Block No:
          <input
            type="number"
            value={blockNo}
            onChange={(e) => setBlockNo(Number(e.target.value))}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Data:
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Nonce:
          <input
            type="number"
            value={nonce}
            onChange={(e) => setNonce(Number(e.target.value))}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Previous Hash:
          <input
            readOnly
            value={previousHash}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Hash:
          <input
            readOnly
            value={hash}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <button
          onClick={handleMine}
          className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded"
        >
          Mine Block
        </button>
      </div>
    </div>
  );
}

