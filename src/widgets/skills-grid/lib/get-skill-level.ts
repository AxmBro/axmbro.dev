export type SkillStrengthTier = "peak" | "strong" | "solid" | "building";

const TIER_BY_VALUE: Record<string, SkillStrengthTier> = {
  Expert: "peak",
  Advanced: "strong",
  Intermediate: "solid",
  Beginner: "building",
  Native: "peak",
  "B2 (Learning)": "solid",
  B2: "solid",
};

export function getSkillLevel(value: string): {
  tier: SkillStrengthTier;
  label: string;
} {
  return {
    tier: TIER_BY_VALUE[value] ?? "solid",
    label: value,
  };
}
