import { BuyBookCTA } from '../components/cta';

/**
 * Contact Page
 * Página de contato com integração do Buy Book CTA
 */
export function Contact() {
  return (
    <div className="container-narrow section-padding">
      {/* Seção "Take your Next step" com Buy Book CTA */}
      <section className="py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Texto - mantém max-w-prose para não quebrar layout */}
          <div className="max-w-prose flex-1">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Take your Next step
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Ready to transform your leadership? Connect with us and start your journey 
              toward becoming the hero you were meant to be.
            </p>
          </div>
          
          {/* Botão Buy Book - shrink-0 para não encolher */}
          <div className="shrink-0">
            <BuyBookCTA />
          </div>
        </div>
      </section>
      
      {/* Resto do conteúdo da página Contact */}
      {/* ... formulário de contato, etc ... */}
    </div>
  );
}
