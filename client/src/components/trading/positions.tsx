export default function Positions() {
  return (
    <section id="posiciones-largo" className="trading-card p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Posiciones en Largo y Corto</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posición Larga */}
        <div className="bg-success/10 p-6 rounded-lg border border-success/30" data-testid="position-long">
          <h3 className="text-xl font-semibold mb-4 text-success flex items-center">
            📈 Posición Larga (LONG)
          </h3>
          <p className="text-muted-foreground mb-4">
            Compras un activo esperando que su precio suba. Ganas dinero cuando el precio aumenta.
          </p>
          
          <div className="space-y-3">
            <div className="bg-success/20 p-3 rounded">
              <h4 className="font-semibold text-sm mb-2">¿Cuándo entrar en LONG?</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">✓ Tendencia alcista confirmada</li>
                <li className="flex items-center">✓ Precio rebota en soporte</li>
                <li className="flex items-center">✓ Ruptura de resistencia</li>
                <li className="flex items-center">✓ Indicadores alcistas</li>
              </ul>
            </div>
            
            <div className="border border-success/30 p-3 rounded">
              <h4 className="font-semibold text-sm mb-2">Ejemplo de Operación:</h4>
              <div className="text-xs space-y-1">
                <div><span className="text-success">Entrada:</span> $100</div>
                <div><span className="text-success">Stop Loss:</span> $95 (-5%)</div>
                <div><span className="text-success">Take Profit:</span> $110 (+10%)</div>
                <div><span className="text-success">R/R:</span> 1:2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Posición Corta */}
        <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/30" data-testid="position-short">
          <h3 className="text-xl font-semibold mb-4 text-destructive flex items-center">
            📉 Posición Corta (SHORT)
          </h3>
          <p className="text-muted-foreground mb-4">
            Vendes un activo que no posees, esperando que su precio baje. Ganas dinero cuando el precio disminuye.
          </p>
          
          <div className="space-y-3">
            <div className="bg-destructive/20 p-3 rounded">
              <h4 className="font-semibold text-sm mb-2">¿Cuándo entrar en SHORT?</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">✓ Tendencia bajista confirmada</li>
                <li className="flex items-center">✓ Precio rebota en resistencia</li>
                <li className="flex items-center">✓ Ruptura de soporte</li>
                <li className="flex items-center">✓ Indicadores bajistas</li>
              </ul>
            </div>
            
            <div className="border border-destructive/30 p-3 rounded">
              <h4 className="font-semibold text-sm mb-2">Ejemplo de Operación:</h4>
              <div className="text-xs space-y-1">
                <div><span className="text-destructive">Entrada:</span> $100</div>
                <div><span className="text-destructive">Stop Loss:</span> $105 (-5%)</div>
                <div><span className="text-destructive">Take Profit:</span> $90 (+10%)</div>
                <div><span className="text-destructive">R/R:</span> 1:2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="mt-8 bg-accent/10 p-6 rounded-lg border border-accent/30">
        <h3 className="text-xl font-semibold mb-4 text-accent">Gestión de Riesgo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center" data-testid="risk-per-trade">
            <div className="text-2xl font-bold text-accent mb-2">2%</div>
            <div className="text-sm text-muted-foreground">Riesgo máximo por operación</div>
          </div>
          <div className="text-center" data-testid="risk-reward-ratio">
            <div className="text-2xl font-bold text-accent mb-2">1:2</div>
            <div className="text-sm text-muted-foreground">Relación Riesgo/Beneficio mínima</div>
          </div>
          <div className="text-center" data-testid="max-total-risk">
            <div className="text-2xl font-bold text-accent mb-2">10%</div>
            <div className="text-sm text-muted-foreground">Riesgo máximo total</div>
          </div>
        </div>
      </div>
    </section>
  );
}
