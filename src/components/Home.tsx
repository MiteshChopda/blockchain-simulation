
import { useState } from "react";
import Navbar from "./Navbar";
import Hash from "./Hash"
import Block from "./Block";
import Blockchain from "./Blockchain";

type ActiveView = "hash" | "block" | "blockchain";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("hash");

  const renderComponent = () => {
    switch (activeView) {
      case "hash":
        return <Hash />;
      case "block":
        return <Block />;
      case "blockchain":
        return <Blockchain />;
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

