
type View =
  | "landing"
  | "hash"
  | "block"
  | "blockchain"
  | "transaction";

type NavbarProps = {
  active: View;
  onSelect: (view: View) => void;
};

export default function Navbar({ active, onSelect }: NavbarProps) {
  const navItems: { label: string; view: View }[] = [
    { label: "Home", view: "landing" },
    { label: "Hash", view: "hash" },
    { label: "Block", view: "block" },
    { label: "Blockchain", view: "blockchain" },
    { label: "Transaction", view: "transaction" },
  ];

  const githubUrl = "https://github.com/MiteshChopda/blockchain-simulation"// placeholder

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="text-white text-xl font-semibold tracking-wide">
            Blockchain Demo
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">

            {navItems.map((item) => {
              const isActive = active === item.view;

              return (
                <button
                  key={item.view}
                  onClick={() => onSelect(item.view)}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }
                  `}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full"></span>
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-gray-700 mx-2" />

            {/* GitHub Link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" py-2 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              GitHub
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
}

