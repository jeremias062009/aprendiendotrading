export default function CandlestickPatterns() {
  return (
    <section id="velas-japonesas" className="trading-card p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Velas Japonesas</h2>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Anatomía de una Vela</h3>
            <p className="text-muted-foreground mb-4">
              Las velas japonesas representan la acción del precio en un período específico, 
              mostrando los precios de apertura, cierre, máximo y mínimo.
            </p>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Componentes:</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="profit font-semibold">Verde/Blanco:</span> Precio cierre &gt; apertura (alcista)</li>
                <li><span className="loss font-semibold">Rojo/Negro:</span> Precio cierre &lt; apertura (bajista)</li>
                <li><span className="text-accent font-semibold">Cuerpo:</span> Diferencia entre apertura y cierre</li>
                <li><span className="text-accent font-semibold">Mechas:</span> Máximos y mínimos del período</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="space-y-8">
              {/* Vela Alcista */}
              <div className="flex items-center space-x-4" data-testid="candlestick-bullish">
                <div className="relative">
                  <div className="w-1 h-16 bg-success mx-auto"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-12 candlestick-green rounded-sm border-2 border-success"></div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-success">Vela Alcista</div>
                  <div className="text-muted-foreground">Cierre &gt; Apertura</div>
                </div>
              </div>
              {/* Vela Bajista */}
              <div className="flex items-center space-x-4" data-testid="candlestick-bearish">
                <div className="relative">
                  <div className="w-1 h-16 bg-destructive mx-auto"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-12 candlestick-red rounded-sm border-2 border-destructive"></div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-destructive">Vela Bajista</div>
                  <div className="text-muted-foreground">Cierre &lt; Apertura</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patrones de Velas */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Patrones Importantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 p-4 rounded-lg text-center" data-testid="pattern-doji">
              <div className="mb-3">
                <div className="relative inline-block">
                  <div className="w-1 h-12 bg-muted-foreground mx-auto"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-muted-foreground rounded-sm"></div>
                </div>
              </div>
              <h4 className="font-semibold">Doji</h4>
              <p className="text-xs text-muted-foreground mt-1">Indecisión del mercado</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg text-center" data-testid="pattern-hammer">
              <div className="mb-3">
                <div className="relative inline-block">
                  <div className="w-1 h-8 bg-success mx-auto"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 candlestick-green rounded-sm"></div>
                </div>
              </div>
              <h4 className="font-semibold">Martillo</h4>
              <p className="text-xs text-muted-foreground mt-1">Reversión alcista</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg text-center" data-testid="pattern-shooting-star">
              <div className="mb-3">
                <div className="relative inline-block">
                  <div className="w-1 h-8 bg-destructive mx-auto"></div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 candlestick-red rounded-sm"></div>
                </div>
              </div>
              <h4 className="font-semibold">Estrella Fugaz</h4>
              <p className="text-xs text-muted-foreground mt-1">Reversión bajista</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
