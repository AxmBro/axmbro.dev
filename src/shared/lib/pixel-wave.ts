export type PixelWavePalette = "default" | "monochrome";

export type PixelWaveSpawnDetail = {
  clipSelector?: string;
  palette?: PixelWavePalette;
  opacityScale?: number;
};

export const PIXEL_WAVE_SPAWN_EVENT = "pixel-wave:spawn";

export const HERO_MONOCHROME_WAVE = {
  intervalMs: 6000,
  opacityScale: 0.72,
} as const;

export function dispatchPixelWaveSpawn(detail: PixelWaveSpawnDetail) {
  window.dispatchEvent(
    new CustomEvent<PixelWaveSpawnDetail>(PIXEL_WAVE_SPAWN_EVENT, { detail }),
  );
}
