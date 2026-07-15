export type PixelWavePalette = "default" | "monochrome";

export type PixelWaveSpawnDetail = {
  clipSelector?: string;
  palette?: PixelWavePalette;
  opacityScale?: number;
};

export const PIXEL_WAVE_SPAWN_EVENT = "pixel-wave:spawn";

export function dispatchPixelWaveSpawn(detail: PixelWaveSpawnDetail) {
  window.dispatchEvent(
    new CustomEvent<PixelWaveSpawnDetail>(PIXEL_WAVE_SPAWN_EVENT, { detail }),
  );
}
