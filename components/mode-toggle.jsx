import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
const options = [
  { value: "light", Icon: SunIcon, label: "Light" },
  { value: "system", Icon: MonitorIcon, label: "System" },
  { value: "dark", Icon: MoonIcon, label: "Dark" }
];
function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return <div
    role="radiogroup"
    aria-label="Theme"
    className="flex items-center rounded-full border border-border bg-muted/60 p-0.5 gap-0.5"
  >
      {options.map(({ value, Icon, label }) => <button
    key={value}
    role="radio"
    aria-checked={theme === value}
    aria-label={label}
    onClick={() => setTheme(value)}
    className={cn(
      "flex size-7 items-center justify-center rounded-full transition-all duration-200",
      theme === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
    )}
  >
          <Icon className="size-3.5" />
        </button>)}
    </div>;
}
export {
  ModeToggle
};
