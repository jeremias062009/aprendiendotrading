import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleScrollToContent = () => {
    const element = document.querySelector('#introduccion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToPlatforms = () => {
    const element = document.querySelector('#binance-tutorial');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/20 px-6 py-16 lg:ml-80">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Domina el <span className="text-primary">Trading</span> desde Cero
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
          Aprende todos los conceptos fundamentales, indicadores técnicos y estrategias para convertirte en un trader exitoso
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button 
            onClick={handleScrollToContent}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
            data-testid="button-start-learning"
          >
            Comenzar Aprendizaje
          </Button>
          <Button 
            onClick={handleScrollToPlatforms}
            variant="outline"
            className="border border-border px-8 py-3 rounded-lg hover:bg-secondary/50 transition-colors text-lg"
            data-testid="button-view-platforms"
          >
            Ver Plataformas
          </Button>
        </div>
      </div>
    </section>
  );
}
