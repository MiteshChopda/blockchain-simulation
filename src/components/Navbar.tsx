
type View = "hash" | "block" | "blockchain";

type NavbarProps = {
  onSelect: (view: View) => void;
};

export default function Navbar({ onSelect }: NavbarProps) {
  const navItems: { label: string; view: View }[] = [
    { label: "Hash", view: "hash" },
    { label: "Block", view: "block" },
    { label: "Blockchain", view: "blockchain" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Title */}
          <div className="text-white text-lg font-medium">
            Blockchain Demo
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onSelect(item.view)}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

