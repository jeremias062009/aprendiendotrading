import { Zap, ChevronRight } from "lucide-react";

export default function BinanceTutorial() {
  return (
    <section id="binance-tutorial" className="trading-card p-8 rounded-xl">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-500 p-2 rounded-lg mr-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary">Tutorial Binance</h2>
          <p className="text-muted-foreground">Aprende a usar la plataforma líder en criptomonedas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-1">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
            <h3 className="font-semibold">Registro y Verificación</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Crea tu cuenta en binance.com
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Completa la verificación KYC
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Activa la autenticación 2FA
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Verifica tu identidad
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-2">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
            <h3 className="font-semibold">Depositar Fondos</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Ve a "Wallet" → "Fiat y Spot"
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Selecciona "Depositar"
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Elige tu moneda (USD, EUR, etc.)
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Sigue las instrucciones
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-3">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
            <h3 className="font-semibold">Hacer Trading</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Ve a "Trade" → "Spot"
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Selecciona el par de trading
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Elige tipo de orden
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              Ejecuta la operación
            </li>
          </ul>
        </div>

        {/* Advanced Features */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-4">
          <div className="flex items-center mb-4">
            <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</div>
            <h3 className="font-semibold">Funciones Avanzadas</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-accent" />
              Futures y Derivados
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-accent" />
              Staking y Earn
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-accent" />
              Margin Trading
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-accent" />
              Copy Trading
            </li>
          </ul>
        </div>

        {/* Security Tips */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-5">
          <div className="flex items-center mb-4">
            <div className="bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</div>
            <h3 className="font-semibold">Seguridad</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-destructive" />
              Nunca compartas tu contraseña
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-destructive" />
              Usa siempre 2FA
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-destructive" />
              Retira a wallets seguras
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-destructive" />
              Revisa URLs cuidadosamente
            </li>
          </ul>
        </div>

        {/* Pro Tips */}
        <div className="bg-secondary/30 p-6 rounded-lg border border-border" data-testid="binance-step-6">
          <div className="flex items-center mb-4">
            <div className="bg-success text-success-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</div>
            <h3 className="font-semibold">Consejos Pro</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-success" />
              Utiliza órdenes limit
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-success" />
              Configura stop-loss
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-success" />
              Diversifica tu portfolio
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-success" />
              Practica con pequeñas cantidades
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
