
import { useState } from "react";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Hash from "./Hash"
import Block from "./Block";
import Blockchain from "./Blockchain";
import { Transaction } from "./Transaction";

type ActiveView =
  | "landing"
  | "hash"
  | "block"
  | "blockchain"
  | "transaction";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("transaction");

  const renderComponent = () => {
    switch (activeView) {
      case "hash":
        return <Hash />;
      case "block":
        return <Block block={{ blockNo: 69, data: "", nonce: 69, previousHash: "0".repeat(64) }} />;
      case "blockchain":
        return <Blockchain />;
      case "transaction":
        return <Transaction />
      case "landing":
        return <Landing />
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar onSelect={setActiveView} active={activeView} />
      <main className="p-4">
        {renderComponent()}
      </main>
    </>
  );
}

