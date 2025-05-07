import Star from "@/components/ui/star";

export function Rating({
  filled,
  size = "md",
}: {
  filled: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((item) => (
        <Star key={item} size={size} filled={item <= filled} />
      ))}
    </div>
  );
}
