/**
 * CTA Links Configuration
 * Centralized configuration for Call-to-Action links
 * Follows Single Responsibility Principle (SRP)
 */

export const CTA_LINKS = {
  buyBook: "https://a.co/d/5m8frEq",
} as const;

export const CTA_LABELS = {
  buyBook: "Buy Book",
} as const;

export type CTALinkKey = keyof typeof CTA_LINKS;
export type CTALabelKey = keyof typeof CTA_LABELS;
