import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useLoading from "../hooks/useLoading";
import IngredientChecklist from "../components/IngredientChecklist";

function BackLink({ className = "" }) {
  return (
    <Link
      to="/"
      className={`text-accent hover:underline inline-flex items-center gap-1 ${className}`}
    >
      <svg
        className="w-4 h-4 stroke-current fill-none"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back to recipes
    </Link>
  );
}

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  async function fetchRecipe() {
    startLoading();
    setErrorMsg("");

    try {
      const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
      setRecipe(data);
    } catch (error) {
      setErrorMsg("Could not load recipe details. Please try again.");
    }

    stopLoading();
  }

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8 animate-pulse" aria-hidden="true">
        <div className="h-4 w-32 rounded bg-border/70 mb-6" />
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="w-full md:w-1/2 h-80 rounded-2xl bg-border/60" />
          <div className="md:w-1/2 space-y-3">
            <div className="h-8 w-3/4 rounded bg-border/70" />
            <div className="h-4 w-1/2 rounded bg-border/50" />
            <div className="h-24 rounded bg-border/40" />
          </div>
        </div>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <BackLink className="mb-4" />
        <p className="text-accent text-center">{errorMsg}</p>
      </main>
    );
  }

  const stats = [
    { label: "Prep", value: `${recipe.prepTimeMinutes} mins` },
    { label: "Cook", value: `${recipe.cookTimeMinutes} mins` },
    { label: "Servings", value: recipe.servings },
    { label: "Calories", value: `${recipe.caloriesPerServing} kcal` },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <BackLink className="mb-6" />

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full md:w-1/2 h-80 md:h-auto md:max-h-[104] object-cover rounded-2xl border border-border"
        />
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {recipe.name}
          </h1>
          <p className="text-muted mb-4">
            {recipe.cuisine} cuisine, {recipe.difficulty?.toLowerCase()}
          </p>
          <div className="flex items-center gap-1.5 mb-6 font-medium">
            <svg className="w-4 h-4 fill-star" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>
              {recipe.rating}{" "}
              <span className="text-muted font-normal">
                from {recipe.reviewCount} reviews
              </span>
            </span>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden mb-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-4 py-3">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-sm text-muted mb-1">
            <span className="font-medium text-text">Meal type:</span>{" "}
            {recipe.mealType?.join(", ")}
          </p>
          <p className="text-sm text-muted">
            <span className="font-medium text-text">Tags:</span>{" "}
            {recipe.tags?.join(", ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 md:sticky md:top-24">
          <IngredientChecklist
            key={id}
            recipeId={id}
            ingredients={recipe.ingredients}
          />
        </div>

        <section className="md:col-span-3" aria-labelledby="instructions-heading">
          <h2
            id="instructions-heading"
            className="font-display text-xl font-bold mb-4"
          >
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions?.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {index + 1}
                </span>
                <p className="pt-0.5 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

export default RecipeDetail;
