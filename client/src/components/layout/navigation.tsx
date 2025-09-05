import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TrendingUp, Menu, Settings, ExternalLink } from "lucide-react";

const navigationSections = [
  {
    title: "Conceptos Básicos",
    items: [
      { label: "Introducción al Trading", href: "#introduccion" },
      { label: "Tendencias", href: "#tendencias" },
      { label: "Soporte y Resistencia", href: "#soporte-resistencia" },
      { label: "Velas Japonesas", href: "#velas-japonesas" },
    ]
  },
  {
    title: "Indicadores Técnicos",
    items: [
      { label: "Medias Móviles", href: "#medias-moviles" },
      { label: "Fibonacci", href: "#fibonacci" },
      { label: "RSI", href: "#rsi" },
      { label: "MACD", href: "#macd" },
    ]
  },
  {
    title: "Estrategias",
    items: [
      { label: "Posiciones en Largo", href: "#posiciones-largo" },
      { label: "Posiciones en Corto", href: "#posiciones-corto" },
      { label: "Gestión de Riesgo", href: "#gestion-riesgo" },
    ]
  },
  {
    title: "Plataformas",
    items: [
      { label: "Tutorial Binance", href: "#binance-tutorial" },
      { label: "Tutorial BingX", href: "#bingx-tutorial" },
    ]
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const NavContent = () => (
    <nav className="space-y-6">
      {navigationSections.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold mb-3 text-primary">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleScrollTo(item.href)}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors text-sm"
                  data-testid={`nav-link-${item.href.replace('#', '')}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Referral Section */}
      <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <h3 className="font-semibold mb-2 text-accent">¡Únete con mi enlace!</h3>
        <p className="text-sm text-muted-foreground mb-3">Obtén beneficios exclusivos</p>
        <a 
          href="https://bingx.com/referral-program/THPORK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm font-medium flex items-center justify-center"
          data-testid="link-bingx-referral"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Registro BingX
        </a>
      </div>
    </nav>
  );

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-2 rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Aprendiendo Trading</h1>
                <p className="text-sm text-muted-foreground">Tu guía completa al mundo del trading</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success text-sm font-medium">Datos en vivo</span>
              </div>
              <Link to="/admin">
                <Button variant="secondary" data-testid="button-admin-access">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon" data-testid="button-mobile-menu">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <NavContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] bg-card border-r border-border hidden lg:block overflow-y-auto z-30">
        <div className="p-6">
          <NavContent />
        </div>
      </aside>
    </>
  );
}
