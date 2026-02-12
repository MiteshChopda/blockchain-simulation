
import { useEffect, useState } from "react";
import Block, { type BlockSnapshot } from "./Block";
import { sha256 } from "../utils/hash";

const DIFFICULTY = 4;
const GENESIS_PREV_HASH = "0".repeat(64);



export default function Blockchain() {
  const [chain, setChain] = useState<BlockSnapshot[]>([
    {
      blockNo: 1,
      data: "Genesis Block",
      nonce: 69,
      previousHash: GENESIS_PREV_HASH,
      hash: "",
    },
  ]);

  const handleBlockUpdate = (index: number, snapshot: BlockSnapshot) => {
    const updated = [...chain];
    updated[index] = snapshot;

    for (let i = index + 1; i < updated.length; i++) {
      updated[i] = {
        ...updated[i],
        previousHash: updated[i - 1].hash,
      };
    }

    setChain(updated);
  };

  const addBlock = () => {
    const last = chain[chain.length - 1];

    setChain([
      ...chain,
      {
        blockNo: chain.length + 1,
        nonce: 0,
        data: "",
        previousHash: last.hash || GENESIS_PREV_HASH,
        hash: "",
      },
    ]);
  };

  const removeBlock = (index: number) => {
    if (index === 0) return;

    const updated = chain.filter((_, i) => i !== index);

    const fixed = updated.map((block, i) => ({
      ...block,
      blockNo: i + 1,
      previousHash: i === 0 ? GENESIS_PREV_HASH : updated[i - 1].hash,
    }));

    setChain(fixed);
  };

  const validateChain = async (): Promise<boolean[]> => {
    const results: boolean[] = [];
    let broken = false;
    const target = "0".repeat(DIFFICULTY);

    for (let i = 0; i < chain.length; i++) {
      const b = chain[i];
      const input = `${b.blockNo}${b.nonce}${b.data}${b.previousHash}`;
      const expectedHash = await sha256(input);

      const valid =
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
    <div className="flex flex-col gap-6 p-6">

      <h1 className="text-center text-xl font-bold">
        Blockchain (Difficulty: {DIFFICULTY})
      </h1>

      {/* Scrollable horizontal container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

        {chain.map((block, index) => {
          const valid = validity[index];

          return (
            <div
              key={index}
              className={`min-w-[420px] flex-shrink-0 rounded-3xl transition-all duration-300 ${valid ? "bg-green-100" : "bg-red-100"
                }`}
            >
              <Block
                block={block}
                onUpdate={(snapshot) =>
                  handleBlockUpdate(index, snapshot)
                }
                showHeader={false}
              />

              {index !== 0 && (
                <div className="flex justify-center pb-4">
                  <button
                    onClick={() => removeBlock(index)}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}

      </div>

      <button
        onClick={addBlock}
        className="self-center px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition"
      >
        Add Block
      </button>
    </div>
  );
}

