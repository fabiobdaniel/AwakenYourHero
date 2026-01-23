/**
 * EXEMPLO: Rota Contact com Buy Book CTA integrado
 * 
 * Se você usa React Router, este é um exemplo de como
 * integrar o componente BuyBookCTA na rota /contact
 */

import { BuyBookCTA } from '../components/cta';

export function ContactPage() {
  return (
    <div className="container-narrow section-padding">
      {/* Seção "Take your Next step" */}
      <section className="py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-prose flex-1">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Take your Next step
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Descrição da seção...
            </p>
          </div>
          
          <BuyBookCTA className="shrink-0" />
        </div>
      </section>
    </div>
  );
}
