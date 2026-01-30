
import { useState } from "react";
import { sha256 } from "../utils/hash";

export default function Hash() {
  const [data, setData] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setData(value);

    const result = await sha256(value);
    setHash(result);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="self-center font-bold">
        SHA256 hash
      </h1>

      <div className="justify-center p-2 flex flex-col gap-2 m-auto min-w-96">
        <label htmlFor="hash_data">Data:</label>
        <textarea
          id="hash_data"
          className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl"
          value={data}
          onChange={handleChange}
        />

        <label>Hash:</label>
        <input
          type="text"
          readOnly
          className="bg-amber-50 border-2 p-2 border-gray-400 rounded-xl"
          value={hash}
        />
      </div>
    </div>
  );
}
