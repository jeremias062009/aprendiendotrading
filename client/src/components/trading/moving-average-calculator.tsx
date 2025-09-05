import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, BarChart3 } from "lucide-react";

export function MovingAverageCalculator() {
  const [prices, setPrices] = useState<string>("");
  const [period, setPeriod] = useState<string>("20");
  const [maType, setMaType] = useState<string>("sma");
  const [result, setResult] = useState<number | null>(null);

  const calculateSMA = (priceArray: number[], periods: number): number => {
    const sum = priceArray.slice(-periods).reduce((acc, price) => acc + price, 0);
    return sum / periods;
  };

  const calculateEMA = (priceArray: number[], periods: number): number => {
    const alpha = 2 / (periods + 1);
    let ema = priceArray[0];
    
    for (let i = 1; i < priceArray.length; i++) {
      ema = (priceArray[i] * alpha) + (ema * (1 - alpha));
    }
    
    return ema;
  };

  const calculateMA = () => {
    const priceArray = prices
      .split(',')
      .map(p => parseFloat(p.trim()))
      .filter(p => !isNaN(p));

    if (priceArray.length === 0 || parseInt(period) > priceArray.length) {
      return;
    }

    const periods = parseInt(period);
    let calculatedMA: number;

    switch (maType) {
      case "sma":
        calculatedMA = calculateSMA(priceArray, periods);
        break;
      case "ema":
        calculatedMA = calculateEMA(priceArray, periods);
        break;
      default:
        calculatedMA = calculateSMA(priceArray, periods);
    }

    setResult(calculatedMA);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Calculadora de Medias Móviles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={maType} onValueChange={setMaType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sma" data-testid="tab-sma">SMA</TabsTrigger>
            <TabsTrigger value="ema" data-testid="tab-ema">EMA</TabsTrigger>
          </TabsList>

          <TabsContent value="sma" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Media Móvil Simple (SMA)</h4>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Fórmula:</strong> SMA = (P1 + P2 + ... + Pn) / n
              </p>
              <div className="bg-blue-100 p-3 rounded font-mono text-sm text-blue-900">
                SMA = Suma de precios / Número de períodos
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ema" className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Media Móvil Exponencial (EMA)</h4>
              <p className="text-sm text-purple-700 mb-2">
                <strong>Fórmula:</strong> EMA = (Precio × α) + (EMA anterior × (1-α))
              </p>
              <div className="bg-purple-100 p-3 rounded font-mono text-sm text-purple-900">
                α = 2 / (período + 1)
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ma-period">Período</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger data-testid="select-ma-period">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 períodos</SelectItem>
                <SelectItem value="10">10 períodos</SelectItem>
                <SelectItem value="20">20 períodos</SelectItem>
                <SelectItem value="50">50 períodos</SelectItem>
                <SelectItem value="100">100 períodos</SelectItem>
                <SelectItem value="200">200 períodos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de MA</Label>
            <div className="text-sm p-2 bg-muted rounded">
              {maType === "sma" ? "Simple (SMA)" : "Exponencial (EMA)"}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ma-prices">Precios (separados por comas)</Label>
          <Input
            id="ma-prices"
            placeholder="100.5, 101.2, 99.8, 102.1, 100.9..."
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
            data-testid="input-ma-prices"
          />
          <p className="text-xs text-muted-foreground">
            Ingresa al menos {period} precios para calcular la media móvil
          </p>
        </div>

        <Button 
          onClick={calculateMA} 
          className="w-full"
          disabled={!prices || prices.split(',').filter(p => !isNaN(parseFloat(p.trim()))).length < parseInt(period)}
          data-testid="button-calculate-ma"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calcular {maType.toUpperCase()}
        </Button>

        {result !== null && (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Resultado {maType.toUpperCase()}{period}:</span>
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent" data-testid="result-ma-value">
                {result.toFixed(4)}
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-semibold mb-2">Interpretación:</h5>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Si el precio está por encima de la MA: <strong>Tendencia alcista</strong></div>
                <div>• Si el precio está por debajo de la MA: <strong>Tendencia bajista</strong></div>
                <div>• Cruces de MA pueden indicar cambios de tendencia</div>
                {maType === "ema" && (
                  <div className="mt-2 text-purple-600">
                    • EMA reacciona más rápido a cambios de precio que SMA
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
