import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";

export function FibonacciCalculator() {
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [results, setResults] = useState<{ level: string; value: number; type: string }[]>([]);

  const fibonacciLevels = [
    { level: "0.0%", ratio: 0.0, type: "base" },
    { level: "23.6%", ratio: 0.236, type: "retracement" },
    { level: "38.2%", ratio: 0.382, type: "retracement" },
    { level: "50.0%", ratio: 0.5, type: "retracement" },
    { level: "61.8%", ratio: 0.618, type: "retracement" },
    { level: "78.6%", ratio: 0.786, type: "retracement" },
    { level: "100.0%", ratio: 1.0, type: "base" },
    { level: "127.2%", ratio: 1.272, type: "extension" },
    { level: "161.8%", ratio: 1.618, type: "extension" },
    { level: "261.8%", ratio: 2.618, type: "extension" },
  ];

  const calculateFibonacci = () => {
    const highValue = parseFloat(high);
    const lowValue = parseFloat(low);

    if (isNaN(highValue) || isNaN(lowValue) || highValue <= lowValue) {
      return;
    }

    const range = highValue - lowValue;
    const calculatedResults = fibonacciLevels.map(({ level, ratio, type }) => ({
      level,
      value: lowValue + (range * ratio),
      type,
    }));

    setResults(calculatedResults);
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "retracement":
        return "default";
      case "extension":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "retracement":
        return "text-blue-600";
      case "extension":
        return "text-purple-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Calculadora de Fibonacci</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fib-high">Precio Máximo</Label>
            <Input
              id="fib-high"
              type="number"
              step="0.01"
              placeholder="1.3500"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
              data-testid="input-fib-high"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fib-low">Precio Mínimo</Label>
            <Input
              id="fib-low"
              type="number"
              step="0.01"
              placeholder="1.3000"
              value={low}
              onChange={(e) => setLow(e.target.value)}
              data-testid="input-fib-low"
            />
          </div>
        </div>

        <Button 
          onClick={calculateFibonacci} 
          className="w-full"
          disabled={!high || !low}
          data-testid="button-calculate-fibonacci"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calcular Niveles de Fibonacci
        </Button>

        {results.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Niveles Calculados:</h4>
            <div className="space-y-2">
              {results.map(({ level, value, type }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`fib-result-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant={getBadgeVariant(type)} className={getBadgeColor(type)}>
                      {level}
                    </Badge>
                    {type === "retracement" && <TrendingDown className="h-4 w-4 text-blue-500" />}
                    {type === "extension" && <TrendingUp className="h-4 w-4 text-purple-500" />}
                  </div>
                  <span className="font-mono font-medium">
                    {value.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h5 className="font-semibold text-accent mb-2">Cómo usar estos niveles:</h5>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-3 w-3 text-blue-500" />
                  <span><strong>Retrocesos:</strong> Niveles de soporte en tendencias alcistas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-3 w-3 text-purple-500" />
                  <span><strong>Extensiones:</strong> Objetivos de precio para movimientos</span>
                </div>
                <div className="mt-2 text-xs">
                  <strong>Zona dorada:</strong> 61.8% es el nivel más importante para retrocesos
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
