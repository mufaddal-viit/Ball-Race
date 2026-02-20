import * as React from "react";

import { cn } from "../../lib/utils";

const Switch = React.forwardRef(
  (
    { className, checked = false, onCheckedChange, disabled = false, onClick, ...props },
    ref
  ) => {
    const handleClick = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !disabled) {
        onCheckedChange?.(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex h-7 w-12 items-center rounded-full border border-[var(--border-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-cyan-400/80" : "bg-[var(--switch-off)]",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-full bg-[var(--surface-strong)] shadow-md transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
