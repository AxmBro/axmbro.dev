export type ButtonVariant = "primary" | "outline";

/** First button in a row: primary; all others: outline. */
export function buttonVariantForIndex(index: number): ButtonVariant {
  return index === 0 ? "primary" : "outline";
}
