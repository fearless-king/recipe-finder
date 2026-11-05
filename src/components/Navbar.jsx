import { Link } from "react-router";

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/70 backdrop-blur-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight text-accent"
        >
          RecipeFinder
        </Link>
        <Link
          to="/"
          className="text-text hover:text-accent font-medium transition-colors"
        >
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
