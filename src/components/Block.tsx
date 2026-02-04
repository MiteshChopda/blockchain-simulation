
import { useState } from "react";
import { mineBlock } from "../utils/mineBlock";
import { sha256 } from "../utils/hash";

const DIFFICULTY = 4;
const GENESIS_PREV_HASH = "0".repeat(64);

export default function Block() {
  const [blockNo, setBlockNo] = useState<number>(1);
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [previousHash] = useState<string>(GENESIS_PREV_HASH);
  const [hash, setHash] = useState<string>("");

  const handleChange = async (
    e: React.ChangeEvent<any>
  ) => {
    const element = e.target.id;
    const value = e.target.value;

    switch (element) {
      case "blockNo":
        setBlockNo(Number(value))
        break
      case "nonce":
        setNonce(Number(value))
        break
      case "data":
        setData(value)
        break
      default:
        break;
    }

    const input = `${blockNo}${nonce}${data}${previousHash}`;
    const result = await sha256(input);
    setHash(result);
  };


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
            id="blockNo"
            type="number"
            value={blockNo}
            onChange={handleChange}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Nonce:
          <input
            id="nonce"
            type="number"
            value={nonce}
            onChange={handleChange}
            className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl w-full"
          />
        </label>

        <label>
          Data:
          <textarea
            id="data"
            value={data}
            onChange={handleChange}
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

