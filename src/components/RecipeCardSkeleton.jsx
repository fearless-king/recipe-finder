function RecipeCardSkeleton() {
  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      <div className="h-52 bg-border/60" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-3/4 rounded bg-border/70" />
        <div className="h-4 w-1/2 rounded bg-border/50" />
      </div>
    </div>
  );
}

export default RecipeCardSkeleton;
