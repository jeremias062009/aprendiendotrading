export default function Fibonacci() {
  return (
    <section id="fibonacci" className="trading-card p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Niveles de Fibonacci</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Retrocesos de Fibonacci</h3>
          <p className="text-muted-foreground">
            Los retrocesos de Fibonacci son niveles horizontales que indican dónde el precio puede encontrar soporte o resistencia. 
            Están basados en la secuencia matemática de Fibonacci.
          </p>
          
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Niveles Principales:</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 px-2 bg-background/30 rounded text-sm" data-testid="fib-level-0">
                <span>0.0%</span>
                <span className="text-muted-foreground">Punto Alto/Bajo</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 bg-accent/20 rounded text-sm" data-testid="fib-level-236">
                <span className="text-accent">23.6%</span>
                <span className="text-muted-foreground">Retroceso Menor</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 bg-accent/20 rounded text-sm" data-testid="fib-level-382">
                <span className="text-accent">38.2%</span>
                <span className="text-muted-foreground">Retroceso Moderado</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 bg-accent/30 rounded text-sm" data-testid="fib-level-618">
                <span className="text-accent font-semibold">61.8%</span>
                <span className="text-muted-foreground">Proporción Áurea</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 bg-destructive/20 rounded text-sm" data-testid="fib-level-786">
                <span className="text-destructive">78.6%</span>
                <span className="text-muted-foreground">Retroceso Profundo</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Extensiones de Fibonacci:</h4>
            <p className="text-sm text-muted-foreground mb-2">Objetivos de precio más allá del movimiento original</p>
            <div className="flex space-x-4 text-sm">
              <span className="px-2 py-1 bg-success/20 rounded text-success" data-testid="fib-ext-1272">127.2%</span>
              <span className="px-2 py-1 bg-success/20 rounded text-success" data-testid="fib-ext-1618">161.8%</span>
              <span className="px-2 py-1 bg-success/20 rounded text-success" data-testid="fib-ext-2618">261.8%</span>
            </div>
          </div>
        </div>
        
        <div className="chart-container p-6 rounded-lg">
          <h4 className="text-center mb-4 font-semibold">Ejemplo de Retrocesos</h4>
          <div className="relative h-48">
            <div className="absolute inset-0">
              {/* Trend line */}
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-success rounded-full"></div>
              <div className="absolute top-4 right-8 w-4 h-4 bg-destructive rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-56 h-0.5 bg-gradient-to-r from-success to-destructive opacity-60 transform rotate-12 origin-left"></div>
              
              {/* Fib levels */}
              <div className="absolute bottom-8 left-0 right-0 h-px bg-accent/60"></div>
              <div className="absolute bottom-16 left-0 right-0 h-px bg-accent/60"></div>
              <div className="absolute bottom-24 left-0 right-0 h-px bg-accent/80"></div>
              <div className="absolute bottom-32 left-0 right-0 h-px bg-accent/60"></div>
              
              {/* Labels */}
              <div className="absolute bottom-6 right-4 text-xs text-accent">23.6%</div>
              <div className="absolute bottom-14 right-4 text-xs text-accent">38.2%</div>
              <div className="absolute bottom-22 right-4 text-xs text-accent font-semibold">61.8%</div>
              <div className="absolute bottom-30 right-4 text-xs text-accent">78.6%</div>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-muted-foreground">
            Niveles de soporte/resistencia fibonacci
          </div>
        </div>
      </div>
    </section>
  );
}
