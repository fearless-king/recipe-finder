import { Link } from "react-router";

function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-6xl font-bold text-accent mb-2">404</h1>
      <h2 className="text-xl font-medium mb-3">Page not found</h2>
      <p className="text-muted mb-6">
        This page doesn't exist. Head back to the recipes.
      </p>
      <Link
        to="/"
        className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 py-2.5 inline-block font-medium transition-colors"
      >
        Back to recipes
      </Link>
    </main>
  );
}

export default NotFound;
