import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface starProps {
  rating?: number;
  filled?: boolean;
  color?: "amber" | "gray" | "red" | "green";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  viewOnly?: boolean;
}

const star = ({
  rating = 1,
  filled = false,
  color = "amber",
  disabled = false,
  size = "md",
  viewOnly = false,
}: starProps) => {
  const starColor = {
    amber: "text-amber-500",
    gray: "text-muted-foreground",
    red: "text-red-500",
    green: "text-emerald-500",
  };

  const starSize = {
    sm: "size-3",
    md: "size-5",
    lg: "size-8",
  };

  const StarSVG = () => {
    return (
      <Star
        className={cn(
          "shrink-0",
          filled ? starColor[color] : "text-border",
          starSize[size]
        )}
        fill="currentColor"
      />
    );
  };

  return (
    <>
      {viewOnly ? (
        <StarSVG />
      ) : (
        <button
          className="appearance-none disabled:opacity-50"
          type="button"
          aria-label={`Star ${rating} out of 5`}
          disabled={disabled}
        >
          <StarSVG />
        </button>
      )}
    </>
  );
};

export default star;
