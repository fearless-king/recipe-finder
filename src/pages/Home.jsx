import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import axios from "axios";
import useLoading from "../hooks/useLoading";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  async function fetchRecipes(skipCount, query) {
    startLoading();

    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${encodeURIComponent(query)}`;
      }
      const { data } = await axios.get(url);

      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      setErrorMsg("Please try again Later!");
    }

    stopLoading();
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let query = form.get("query").trim();

    if (query === searchQuery) {
      return;
    }

    setSearchQuery(query);
    fetchRecipes(0, query);
  }

  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-accent text-center">{errorMsg}</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          What are you cooking today?
        </h1>
        <p className="text-muted mb-6">
          Search by dish, cuisine or ingredient.
        </p>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            name="query"
            aria-label="Search recipes"
            placeholder="Try pasta, pizza or salad"
            className="flex-1 border border-border rounded-full px-5 py-2.5 bg-card text-text outline-none transition-colors focus:border-accent"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 py-2.5 font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {!loading && recipes.length === 0 && (
        <p className="text-center py-6 text-muted">
          {searchQuery
            ? `No recipes found for '${searchQuery}'. Try a different word.`
            : "No recipes to show right now."}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {loading &&
          recipes.length === 0 &&
          Array.from({ length: 6 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-10">
          <button
            onClick={() => fetchRecipes(recipes.length, searchQuery)}
            type="button"
            disabled={loading}
            className="bg-accent hover:bg-accent-hover disabled:opacity-60 text-white rounded-full px-7 py-2.5 font-medium transition-colors"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
