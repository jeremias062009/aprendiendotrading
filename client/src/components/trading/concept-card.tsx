import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant?: "default" | "primary" | "accent";
}

export function ConceptCard({ title, description, icon, variant = "default" }: ConceptCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-primary bg-primary/5 hover:bg-primary/10";
      case "accent":
        return "border-accent bg-accent/5 hover:bg-accent/10";
      default:
        return "border-border bg-card hover:bg-muted/50";
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${getVariantStyles()}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
