import { cn } from "@/lib/utils";
import { Slider as ShadcnSlider } from "@/components/ui/slider";

export default function Slider({
  max,
  value,
  onValueChange,
}: {
  max: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}) {
  const skipInterval = 1; // Set to 1 to allow no text skipping
  const ticks = [...Array(max + 1)].map((_, i) => i);

  return (
    <div>
      <ShadcnSlider
        max={max}
        aria-label="Slider with ticks"
        value={value}
        onValueChange={onValueChange}
      />
      <span
        className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
        aria-hidden="true"
      >
        {ticks.map((_, i) => (
          <span
            key={i}
            className="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span
              className={cn(
                "bg-muted-foreground/70 h-1 w-px",
                i % skipInterval !== 0 && "h-0.5"
              )}
            />
            <span className={cn(i % skipInterval !== 0 && "opacity-0")}>
              {i}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
