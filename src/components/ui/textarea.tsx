import * as React from "react"

import { cn } from "@/lib/utils"

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  resizable?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, resizable = false, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useEffect(() => {
      if (resizable && textareaRef.current) {
        const adjustHeight = () => {
          textareaRef.current!.style.height = "auto";
          textareaRef.current!.style.height = textareaRef.current!.scrollHeight + "px";
        };

        adjustHeight(); // Adjust on mount
        textareaRef.current.addEventListener("input", adjustHeight);

        return () => textareaRef.current?.removeEventListener("input", adjustHeight);
      }
    }, [resizable]);

    return (
      <textarea
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }
        }}
        className={cn(
          "flex min-h-[60px] w-full rounded-[10px] border bg-surface px-3 py-2 text-sm placeholder:text-secondary-foreground focus-visible:outline-hidden focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50",
          resizable ? "overflow-hidden resize-none" : "resize",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
