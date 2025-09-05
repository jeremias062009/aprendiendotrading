import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RefreshCw, BarChart3 } from "lucide-react";

interface CandlestickData {
  open: number;
  high: number;
  low: number;
  close: number;
  pattern: string;
  signal: "bullish" | "bearish" | "neutral";
}

export function CandlestickDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCandle, setCurrentCandle] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  const candlestickPatterns: CandlestickData[] = [
    {
      open: 100,
      high: 105,
      low: 98,
      close: 103,
      pattern: "Martillo (Hammer)",
      signal: "bullish"
    },
    {
      open: 103,
      high: 104,
      low: 99,
      close: 101,
      pattern: "Doji",
      signal: "neutral"
    },
    {
      open: 101,
      high: 106,
      low: 100,
      close: 99,
      pattern: "Estrella Fugaz",
      signal: "bearish"
    },
    {
      open: 99,
      high: 100,
      low: 96,
      close: 102,
      pattern: "Engulfing Alcista",
      signal: "bullish"
    },
    {
      open: 102,
      high: 103,
      low: 97,
      close: 98,
      pattern: "Envolvente Bajista",
      signal: "bearish"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentCandle(prev => (prev + 1) % candlestickPatterns.length);
      }, animationSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, animationSpeed, candlestickPatterns.length]);

  const currentData = candlestickPatterns[currentCandle];
  const isGreen = currentData.close > currentData.open;
  const bodyHeight = Math.abs(currentData.close - currentData.open);
  const wickTop = currentData.high - Math.max(currentData.open, currentData.close);
  const wickBottom = Math.min(currentData.open, currentData.close) - currentData.low;

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "bullish":
        return "text-green-600 bg-green-50 border-green-200";
      case "bearish":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getSignalText = (signal: string) => {
    switch (signal) {
      case "bullish":
        return "Señal Alcista";
      case "bearish":
        return "Señal Bajista";
      default:
        return "Neutral";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Demo de Velas Japonesas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentCandle(0);
                setIsPlaying(false);
              }}
              data-testid="button-reset"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Badge variant="outline" data-testid="badge-current-pattern">
            Patrón {currentCandle + 1} de {candlestickPatterns.length}
          </Badge>
        </div>

        {/* Candlestick Visualization */}
        <div className="bg-gray-900 rounded-lg p-8 flex items-end justify-center" style={{ height: "200px" }}>
          <div className="relative flex flex-col items-center">
            {/* Upper wick */}
            {wickTop > 0 && (
              <div
                className="w-0.5 bg-gray-400"
                style={{ height: `${wickTop * 3}px` }}
              />
            )}
            
            {/* Candle body */}
            <div
              className={`w-8 border-2 ${
                isGreen 
                  ? "bg-green-500 border-green-500" 
                  : "bg-red-500 border-red-500"
              } transition-all duration-300`}
              style={{ height: `${Math.max(bodyHeight * 3, 2)}px` }}
            />
            
            {/* Lower wick */}
            {wickBottom > 0 && (
              <div
                className="w-0.5 bg-gray-400"
                style={{ height: `${wickBottom * 3}px` }}
              />
            )}
            
            {/* Price labels */}
            <div className="absolute -right-12 top-0 text-xs text-gray-400">
              H: {currentData.high}
            </div>
            <div className="absolute -right-12 bottom-0 text-xs text-gray-400">
              L: {currentData.low}
            </div>
            <div className="absolute -left-12 text-xs text-gray-400">
              <div>O: {currentData.open}</div>
              <div>C: {currentData.close}</div>
            </div>
          </div>
        </div>

        {/* Pattern Information */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-bold text-lg mb-2" data-testid="text-pattern-name">
              {currentData.pattern}
            </h4>
            <Badge 
              className={getSignalColor(currentData.signal)}
              data-testid="badge-signal-type"
            >
              {getSignalText(currentData.signal)}
            </Badge>
          </div>

          {/* OHLC Data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground">Apertura</div>
              <div className="font-mono font-semibold" data-testid="value-open">
                {currentData.open.toFixed(2)}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground">Máximo</div>
              <div className="font-mono font-semibold text-green-600" data-testid="value-high">
                {currentData.high.toFixed(2)}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground">Mínimo</div>
              <div className="font-mono font-semibold text-red-600" data-testid="value-low">
                {currentData.low.toFixed(2)}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground">Cierre</div>
              <div className={`font-mono font-semibold ${isGreen ? 'text-green-600' : 'text-red-600'}`} data-testid="value-close">
                {currentData.close.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Pattern Explanation */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h5 className="font-semibold text-accent mb-2">Interpretación del Patrón:</h5>
            <div className="text-sm text-muted-foreground">
              {currentData.pattern === "Martillo (Hammer)" && (
                <div>
                  • Cuerpo pequeño en la parte superior del rango<br/>
                  • Sombra inferior larga (al menos 2x el cuerpo)<br/>
                  • Indica posible reversión alcista después de tendencia bajista
                </div>
              )}
              {currentData.pattern === "Doji" && (
                <div>
                  • Apertura y cierre prácticamente iguales<br/>
                  • Indica indecisión en el mercado<br/>
                  • Posible punto de inflexión o continuación
                </div>
              )}
              {currentData.pattern === "Estrella Fugaz" && (
                <div>
                  • Cuerpo pequeño en la parte inferior del rango<br/>
                  • Sombra superior larga<br/>
                  • Indica posible reversión bajista después de tendencia alcista
                </div>
              )}
              {currentData.pattern === "Engulfing Alcista" && (
                <div>
                  • Vela verde que envuelve completamente a la anterior<br/>
                  • Fuerte señal de reversión alcista<br/>
                  • Mayor volumen confirma la señal
                </div>
              )}
              {currentData.pattern === "Envolvente Bajista" && (
                <div>
                  • Vela roja que envuelve completamente a la anterior<br/>
                  • Fuerte señal de reversión bajista<br/>
                  • Mayor volumen confirma la señal
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
