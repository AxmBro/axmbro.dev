export type ButtonVariant = "primary" | "secondary" | "outline";

export function buttonVariantForIndex(index: number, total: number): ButtonVariant {
  if (index === 0) return "primary";
  if (total >= 3 && index === 1) return "secondary";
  return "outline";
}
