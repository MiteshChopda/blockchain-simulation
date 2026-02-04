
import { useState } from "react";
import Navbar from "./Navbar";
import Hash from "./Hash"
import Block from "./Block";
import Blockchain from "./Blockchain";
import { Transaction } from "./Transaction";

type ActiveView = "hash" | "block" | "blockchain" | "transaction";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("blockchain");

  const renderComponent = () => {
    switch (activeView) {
      case "hash":
        return <Hash />;
      case "block":
        return <Block block={{ blockNo: 69, data: "", nonce: 69, previousHash: "0".repeat(64) }} />;
      case "blockchain":
        return <Blockchain />;
      case "transaction":
        return <Transaction from="e37399b0-0c42-4aa0-bef9-2d2a53eb454c" to='eaea1318-63c1-4966-8e05-c003a07f2458' amount={2.5} fee={0.01} timestamp={new Date()} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar onSelect={setActiveView} />
      <main className="p-4">
        {renderComponent()}
      </main>
    </>
  );
}

