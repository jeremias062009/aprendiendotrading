import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { MarketDataPoint, isPositiveChange, formatPrice } from "@/lib/market-data";

export default function MarketData() {
  const { data: marketData, isLoading } = useQuery<MarketDataPoint[]>({
    queryKey: ["/api/market-data"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (isLoading) {
    return (
      <section className="px-6 py-8 bg-card/50 lg:ml-80">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-primary" />
            Datos de Mercado en Tiempo Real
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="trading-card p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-6 bg-muted rounded mb-1"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-8 bg-card/50 lg:ml-80">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-primary" />
          Datos de Mercado en Tiempo Real
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData?.map((data) => (
            <Card key={data.symbol} className="trading-card p-4" data-testid={`market-data-${data.symbol.replace('/', '-')}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{data.symbol}</span>
                <span className={isPositiveChange(data.change) ? "profit" : "loss"}>
                  {data.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {formatPrice(data.price, data.symbol)}
              </div>
              <div className="text-sm text-muted-foreground">
                Vol: {data.volume}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
