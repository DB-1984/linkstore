import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white shadow hover:bg-slate-900/90 h-9 px-4 py-2",
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
export { Button };
