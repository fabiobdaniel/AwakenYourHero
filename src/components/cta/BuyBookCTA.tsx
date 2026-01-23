import { CTA_LINKS, CTA_LABELS } from '../../config/cta';

/**
 * Buy Book CTA Component
 * Follows Single Responsibility Principle (SRP) - only renders Buy Book CTA
 * Follows Dependency Inversion Principle (DIP) - depends on config abstraction
 * 
 * @param href - Optional custom href (defaults to CTA_LINKS.buyBook)
 * @param label - Optional custom label (defaults to CTA_LABELS.buyBook)
 * @param className - Optional additional CSS classes
 */
interface BuyBookCTAProps {
  href?: string;
  label?: string;
  className?: string;
}

export function BuyBookCTA({ 
  href = CTA_LINKS.buyBook, 
  label = CTA_LABELS.buyBook,
  className = ""
}: BuyBookCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        inline-flex items-center justify-center
        px-6 py-3
        bg-primary text-primary-foreground
        font-semibold
        rounded-lg
        transition-all duration-200
        hover:opacity-90 hover:scale-105
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${className}
      `.trim()}
    >
      {label}
    </a>
  );
}
