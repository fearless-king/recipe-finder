import { Link } from "react-router";
import TiltCard from "./TiltCard";

function RecipeCard({ recipe }) {
  const {
    id,
    name,
    image,
    cuisine,
    difficulty,
    rating,
    prepTimeMinutes,
    cookTimeMinutes,
    mealType,
  } = recipe;

  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <TiltCard className="group bg-card border border-border rounded-2xl">
      <Link to={`/recipe/${id}`} className="flex h-full flex-col">
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Glass panel: rating and time at rest, meal type on hover */}
          <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/50 bg-white/50 text-text backdrop-blur-md transition-all duration-300 group-hover:bg-white/70 group-hover:backdrop-blur-xl">
            <div className="flex items-center justify-between px-3 py-2 text-sm font-medium">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 fill-star" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 stroke-current fill-none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {totalTime} mins
              </span>
            </div>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="px-3 pb-2 text-xs text-text/70">
                  {mealType?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display font-bold text-lg leading-snug text-text mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted">
            {cuisine} cuisine, {difficulty?.toLowerCase()}
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}

export default RecipeCard;
