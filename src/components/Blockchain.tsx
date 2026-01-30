
import { useEffect, useState } from "react";
import { sha256 } from "../utils/hash";
import { mineBlock } from "../utils/mineBlock";

type Block = {
  blockNo: number;
  nonce: number;
  data: string;
  hash: string;
  previousHash: string;
};

const DIFFICULTY = 4;
const GENESIS_PREV_HASH = "0".repeat(64);

export default function Blockchain() {
  const [chain, setChain] = useState<Block[]>([
    {
      blockNo: 1,
      nonce: 0,
      data: "Genesis Block",
      previousHash: GENESIS_PREV_HASH,
      hash: "",
    },
  ]);

  // add new block
  const addBlock = () => {
    const last = chain[chain.length - 1];
    setChain([
      ...chain,
      {
        blockNo: chain.length + 1,
        nonce: 0,
        data: "",
        previousHash: last.hash,
        hash: "",
      },
    ]);
  };

  // update editable fields
  const updateBlock = (
    index: number,
    field: "data" | "nonce",
    value: string | number
  ) => {
    const updated = [...chain];
    // @ts-expect-error controlled
    updated[index][field] = value;
    setChain(updated);
  };

  // mine a specific block
  const mineAtIndex = async (index: number) => {
    const block = chain[index];

    const { nonce, hash } = await mineBlock(
      block.blockNo,
      block.data,
      block.previousHash,
      DIFFICULTY,
      block.nonce
    );

    const updated = [...chain];
    updated[index] = { ...block, nonce, hash };

    // propagate previousHash forward
    for (let i = index + 1; i < updated.length; i++) {
      updated[i].previousHash = updated[i - 1].hash;
    }

    setChain(updated);
  };

  // FULL chain validation (includes difficulty)
  const validateChain = async (): Promise<boolean[]> => {
    const results: boolean[] = [];
    let broken = false;
    const target = "0".repeat(DIFFICULTY);

    for (let i = 0; i < chain.length; i++) {
      const b = chain[i];
      const input = `${b.blockNo}${b.nonce}${b.data}${b.previousHash}`;
      const expectedHash = await sha256(input);

      let valid =
        b.hash === expectedHash &&
        b.hash.startsWith(target) &&
        (i === 0 || b.previousHash === chain[i - 1].hash);

      if (!valid) broken = true;
      results[i] = !broken;
    }

    return results;
  };

  const [validity, setValidity] = useState<boolean[]>([]);

  useEffect(() => {
    validateChain().then(setValidity);
  }, [chain]);

  return (
    <div className="flex flex-col gap-4 p-4 m-auto">
      <h1 className="text-center font-bold text-lg">
        Blockchain (Difficulty: {DIFFICULTY})
      </h1>

      {chain.map((block, index) => {
        const valid = validity[index];

        return (
          <div
            key={index}
            className={`p-4 border-2 rounded-3xl m-auto ${valid
              ? "bg-green-100 border-transparent"
              : "bg-red-100 border-transparent"
              }`}
          >
            <h2 className="font-semibold mb-2">
              Block #{block.blockNo}
            </h2>

            <div className="flex flex-col gap-2 text-sm">
              <label>
                Data:
                <textarea
                  value={block.data}
                  onChange={(e) =>
                    updateBlock(index, "data", e.target.value)
                  }
                  className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
                />
              </label>

              <label>
                Nonce:
                <input
                  type="number"
                  value={block.nonce}
                  onChange={(e) =>
                    updateBlock(index, "nonce", Number(e.target.value))
                  }
                  className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
                />
              </label>

              <label>
                Previous Hash:
                <input
                  readOnly
                  value={block.previousHash}
                  className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
                />
              </label>

              <label>
                Hash:
                <input
                  readOnly
                  value={block.hash}
                  className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
                />
              </label>

              <button
                onClick={() => mineAtIndex(index)}
                className="mt-2 bg-green-700 text-white py-1 rounded"
              >
                Mine Block
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={addBlock}
        className="self-center px-4 py-2 bg-blue-700 text-white rounded"
      >
        Add Block
      </button>
    </div>
  );
}

