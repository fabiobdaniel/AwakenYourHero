/**
 * EXEMPLO: Página Contact com Buy Book CTA integrado
 * 
 * Este é um exemplo de como integrar o componente BuyBookCTA
 * na seção "Take your Next step" da página /contact
 * 
 * IMPORTANTE: Este arquivo é apenas um exemplo.
 * Localize o arquivo real da página Contact no seu projeto
 * e aplique as mesmas modificações.
 */

import { BuyBookCTA } from '../components/cta';

export function Contact() {
  return (
    <div className="container-narrow section-padding">
      {/* ... outras seções da página ... */}
      
      {/* Seção "Take your Next step" - COM Buy Book CTA */}
      <section className="py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Texto - mantém max-w-prose para não quebrar layout */}
          <div className="max-w-prose flex-1">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Take your Next step
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Este é o texto descritivo da seção. O botão "Buy Book" 
              aparecerá ao lado (desktop) ou abaixo (mobile) deste texto.
            </p>
          </div>
          
          {/* Botão Buy Book - shrink-0 para não encolher */}
          <div className="shrink-0">
            <BuyBookCTA />
          </div>
        </div>
      </section>
      
      {/* ... outras seções da página ... */}
    </div>
  );
}
