import { TrendingUp, ExternalLink, ChevronRight, Zap, Shield, Users, Smartphone, BarChart3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BingXTutorial() {
  return (
    <section id="bingx-tutorial" className="trading-card p-8 rounded-xl">
      <div className="flex items-center mb-6">
        <div className="bg-orange-500 p-2 rounded-lg mr-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary">Tutorial BingX</h2>
          <p className="text-muted-foreground">Plataforma avanzada para trading profesional</p>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-accent/20 p-6 rounded-lg border border-orange-500/30 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">¡Únete con mi enlace de referido!</h3>
            <p className="text-muted-foreground">Obtén beneficios exclusivos y comisiones reducidas</p>
          </div>
          <a 
            href="https://bingx.com/referral-program/THPORK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-semibold flex items-center space-x-2"
            data-testid="button-bingx-referral"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Registrarse en BingX</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interface Overview */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Navegación de la Plataforma</h3>
          
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-orange-400">Panel Principal</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-orange-400" />
                Dashboard con resumen de cuentas
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 mr-2 text-orange-400">💼</div>
                Balance y historial de trades
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 mr-2 text-orange-400">🔔</div>
                Notificaciones y alertas
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 mr-2 text-orange-400">⚙️</div>
                Configuración de cuenta
              </li>
            </ul>
          </div>

          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-orange-400">Tipos de Trading</h4>
            <div className="space-y-3">
              <div className="p-3 bg-background/30 rounded" data-testid="bingx-spot-trading">
                <div className="font-medium text-sm">Spot Trading</div>
                <div className="text-xs text-muted-foreground">Compra y venta directa de criptomonedas</div>
              </div>
              <div className="p-3 bg-background/30 rounded" data-testid="bingx-futures-trading">
                <div className="font-medium text-sm">Futures Trading</div>
                <div className="text-xs text-muted-foreground">Trading con apalancamiento hasta 150x</div>
              </div>
              <div className="p-3 bg-background/30 rounded" data-testid="bingx-copy-trading">
                <div className="font-medium text-sm">Copy Trading</div>
                <div className="text-xs text-muted-foreground">Copia estrategias de traders exitosos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step by Step */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Guía Paso a Paso</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-orange-400 pl-4" data-testid="bingx-guide-step-1">
              <h4 className="font-semibold text-sm">1. Registro y Verificación</h4>
              <p className="text-xs text-muted-foreground mt-1">Usa el enlace de referido para obtener beneficios exclusivos</p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-4" data-testid="bingx-guide-step-2">
              <h4 className="font-semibold text-sm">2. Depósito de Fondos</h4>
              <p className="text-xs text-muted-foreground mt-1">Múltiples métodos: transferencia, tarjeta, P2P</p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-4" data-testid="bingx-guide-step-3">
              <h4 className="font-semibold text-sm">3. Configurar Trading</h4>
              <p className="text-xs text-muted-foreground mt-1">Selecciona par, tipo de orden y apalancamiento</p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-4" data-testid="bingx-guide-step-4">
              <h4 className="font-semibold text-sm">4. Gestión de Riesgo</h4>
              <p className="text-xs text-muted-foreground mt-1">Configura stop-loss y take-profit</p>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-4" data-testid="bingx-guide-step-5">
              <h4 className="font-semibold text-sm">5. Monitoreo</h4>
              <p className="text-xs text-muted-foreground mt-1">Utiliza herramientas de análisis avanzadas</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-orange-400">Características Destacadas</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-2 text-orange-400" />
                Ejecución rápida
              </div>
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-2 text-orange-400" />
                Alta seguridad
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-2 text-orange-400" />
                Copy trading
              </div>
              <div className="flex items-center">
                <Smartphone className="w-3 h-3 mr-2 text-orange-400" />
                App móvil
              </div>
              <div className="flex items-center">
                <BarChart3 className="w-3 h-3 mr-2 text-orange-400" />
                Análisis avanzado
              </div>
              <div className="flex items-center">
                <Headphones className="w-3 h-3 mr-2 text-orange-400" />
                Soporte 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
