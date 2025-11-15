import NeomorphCard from "./NeomorphCard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type LatestInfoCardProps = {
  title: string;
  description?: string;
  date?: string;
  to?: string;
  className?: string;
};

const LatestInfoCard = ({ title, description = "-", date = "", to, className }: LatestInfoCardProps) => {
  const content = (
    <NeomorphCard hoverable className={cn("group", className)}>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description || "-"}
        </p>
        {date && (
          <p className="text-sm text-muted-foreground/70 mt-2">{date}</p>
        )}
      </div>
    </NeomorphCard>
  );

  return to ? (
    <Link to={to} className="block">
      {content}
    </Link>
  ) : content;
};

export default LatestInfoCard;