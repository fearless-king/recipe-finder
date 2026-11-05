import { useEffect, useState } from "react";

function IngredientChecklist({ recipeId, ingredients = [] }) {
  const storageKey = `recipe-${recipeId}-gathered`;

  const [checked, setChecked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
    }
  }, [checked, storageKey]);

  function toggle(index) {
    setChecked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  const total = ingredients.length;
  const done = checked.filter((i) => i < total).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <section
      aria-labelledby="ingredients-heading"
      className="bg-card border border-border rounded-2xl p-5"
    >
      <div className="flex items-baseline justify-between mb-3">
        <h2
          id="ingredients-heading"
          className="font-display text-xl font-bold"
        >
          Ingredients
        </h2>
        {done > 0 && (
          <button
            type="button"
            onClick={() => setChecked([])}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            Clear ticks
          </button>
        )}
      </div>

      <div className="mb-4">
        <div
          className="h-1.5 rounded-full bg-border overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
          aria-label="Ingredients gathered"
        >
          <div
            className="h-full bg-accent transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          {done === total && total > 0
            ? "You have everything. Time to cook."
            : `${done} of ${total} gathered`}
        </p>
      </div>

      <ul className="divide-y divide-border">
        {ingredients.map((item, index) => {
          const isChecked = checked.includes(index);
          return (
            <li key={index}>
              <label className="flex items-start gap-3 py-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                  className="peer sr-only"
                />
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-border bg-background transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-checked:[&>svg]:opacity-100">
                  <svg
                    className="w-3.5 h-3.5 stroke-white fill-none opacity-0 transition-opacity"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span
                  className={`transition-colors ${
                    isChecked ? "text-muted line-through" : "text-text"
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default IngredientChecklist;
