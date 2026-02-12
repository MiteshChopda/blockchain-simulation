
import { useEffect, useState } from "react";
import Block, { type BlockSnapshot } from "./Block";
import { sha256 } from "../utils/hash";

const DIFFICULTY = 4;
const GENESIS_PREV_HASH = "0".repeat(64);


export default function Blockchain() {
  const [chain, setChain] = useState<BlockSnapshot[]>([{ blockNo: 1, data: "Genesis Block", nonce: 69, previousHash: GENESIS_PREV_HASH, hash: "" }])


  const handleBlockUpdate = (index: number, snapshot: BlockSnapshot) => {
    const updated = [...chain]
    updated[index] = snapshot

    // propagate previousHash forward
    for (let i = index + 1; i < updated.length; i++) {
      updated[i] = {
        ...updated[i],
        previousHash: updated[i - 1].hash,
      }
    }

    setChain(updated)
  }

  const addBlock = () => {
    const last = chain[chain.length - 1];
    console.log(chain);

    setChain([
      ...chain,
      {
        blockNo: chain.length + 1,
        nonce: 0,
        data: "",
        previousHash: last.hash || "0".repeat(64),
        hash: "",
      },
    ]);
  };

  const removeBlock = (index: number) => {
    // prevent deleting Genesis block
    if (index === 0) return;

    const updated = chain.filter((_, i) => i !== index);

    // re-number and fix previousHash
    const fixed = updated.map((block, i) => ({
      ...block,
      blockNo: i + 1,
      previousHash:
        i === 0 ? GENESIS_PREV_HASH : updated[i - 1].hash,
    }));

    setChain(fixed);
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
            className={`rounded-3xl ${valid
              ? "bg-green-100 border-transparent"
              : "bg-red-100 border-transparent"
              }`}>
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
                  className="px-4 py-1 bg-red-400 text-white rounded"
                >
                  Remove Block
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={addBlock}
        className="self-center px-4 py-2 bg-blue-700 text-white rounded"
      >
        Add Block
      </button>
    </div >
  );
}

