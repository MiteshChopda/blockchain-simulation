
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (data == "") {
      return
    }
    const input = `${blockNo}${nonce}${data}${previousHash}`;
    sha256(input).then((data) => setHash(data))
  }, [data])

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
          <div id="transactins" className="flex flex-col bg-amber-50 border-2 py-4 border-gray-400 rounded-xl w-full">
            <Tx setData={setData} />
            <Tx setData={setData} />
          </div>
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
      </div >
    </div >
  );
}
function Tx({ setData }: { setData: any }) {
  type tx = { amount: number, from: string, to: string }
  const [tx, setTx] = useState<tx>({ amount: 0, from: "address1", to: "address2" })
  const handleTxChanges = async (
    e: React.ChangeEvent<any>
  ) => {
    const element = e.target.id;
    const value = e.target.value;
    setTx(values => ({ ...values, [element]: value }))
    const input = `${tx.amount}${tx.from}${tx.to}`
    console.log(input);
    setData(input)
  }
  return (
    <div className="flex w-full justify-around items-center">
      Amount:&nbsp; <input
        id="amount"
        onChange={handleTxChanges}
        className="border w-18 py-1 pl-0.5 bg-gray-300 rounded"
        value={tx.amount}
        type="number" />
      From:&nbsp; <input
        id="from"
        onChange={handleTxChanges}
        className="border py-1 pl-0.5 bg-gray-300 rounded"
        value={tx.from}
        size={5}
        type="text" />

      TO:&nbsp; <input
        id="to"
        onChange={handleTxChanges}
        className="border py-1 pl-0.5 bg-gray-300 rounded "
        value={tx.to}
        size={5}
        type="text" />
    </div >
  )
}
