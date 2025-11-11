import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface NeomorphCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  inset?: boolean;
  style?: CSSProperties;
}

const NeomorphCard = ({ children, className, hoverable = false, inset = false, style }: NeomorphCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-background p-6",
        inset ? "neomorph-inset" : "neomorph",
        hoverable && "neomorph-hover cursor-pointer",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default NeomorphCard;
