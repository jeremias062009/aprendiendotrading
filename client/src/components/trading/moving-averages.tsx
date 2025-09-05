import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MovingAverages() {
  const [periods, setPeriods] = useState(10);
  const [smaResult, setSmaResult] = useState<number | null>(null);

  const calculateSMA = () => {
    // Simulate SMA calculation with sample data
    const samplePrices = [100, 102, 98, 105, 103, 107, 101, 99, 104, 106];
    const relevantPrices = samplePrices.slice(-periods);
    const sum = relevantPrices.reduce((acc, price) => acc + price, 0);
    const sma = sum / relevantPrices.length;
    setSmaResult(parseFloat(sma.toFixed(2)));
  };

  return (
    <section id="medias-moviles" className="trading-card p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Medias Móviles</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">¿Qué son las Medias Móviles?</h3>
          <p className="text-muted-foreground">
            Las medias móviles suavizan los datos de precios creando un precio promedio que se actualiza constantemente. 
            Son uno de los indicadores técnicos más utilizados para identificar tendencias.
          </p>
          
          {/* Calculadora Interactive */}
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Calculadora de Media Móvil Simple (SMA)</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="sma-periods" className="text-sm text-muted-foreground">Períodos (días):</Label>
                <Input 
                  id="sma-periods"
                  type="number" 
                  value={periods} 
                  onChange={(e) => setPeriods(parseInt(e.target.value) || 10)}
                  className="w-full mt-1 text-sm" 
                  data-testid="input-sma-periods"
                />
              </div>
              <div className="text-sm">
                <div className="text-accent font-medium">Fórmula:</div>
                <div className="font-mono text-xs bg-background/50 p-2 rounded mt-1">
                  SMA = (P₁ + P₂ + ... + Pₙ) / n
                </div>
              </div>
              {smaResult && (
                <div className="bg-success/10 p-3 rounded border border-success/30">
                  <div className="text-sm font-medium text-success">
                    SMA({periods}) = ${smaResult}
                  </div>
                </div>
              )}
              <Button 
                onClick={calculateSMA}
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:bg-primary/90 transition-colors"
                data-testid="button-calculate-sma"
              >
                Calcular SMA
              </Button>
            </div>
          </div>

          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Tipos de Medias Móviles:</h4>
            <ul className="space-y-1 text-sm">
              <li><span className="text-accent">SMA:</span> Media Móvil Simple</li>
              <li><span className="text-accent">EMA:</span> Media Móvil Exponencial</li>
              <li><span className="text-accent">WMA:</span> Media Móvil Ponderada</li>
            </ul>
          </div>
        </div>
        
        <div className="chart-container p-6 rounded-lg">
          <h4 className="text-center mb-4 font-semibold">Ejemplo Visual de SMA</h4>
          <div className="relative h-48 overflow-hidden">
            {/* Precio (línea zigzag) */}
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <polyline 
                points="10,100 30,80 50,120 70,60 90,90 110,45 130,75 150,55 170,85 190,40 210,70 230,50 250,80 270,45 290,75" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.7"
              />
              <polyline 
                points="10,105 30,95 50,105 70,85 90,80 110,70 130,65 150,60 170,65 190,55 210,60 230,55 250,65 270,55 290,65" 
                stroke="#22c55e" 
                strokeWidth="3" 
                fill="none"
              />
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-blue-500"></div>
              <span>Precio</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-success"></div>
              <span>SMA(10)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
