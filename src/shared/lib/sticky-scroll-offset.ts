// One probe element, reused for every `calc()`-shaped length. Creating a node per
// call made the scroll spy rebuild a div on every scroll event.
let probe: HTMLElement | null = null;

function getProbe(): HTMLElement {
  if (probe?.isConnected) return probe;

  probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;height:var(--length-probe);";
  document.documentElement.appendChild(probe);
  return probe;
}

/** Resolves a root CSS length to pixels, including `calc()` values. */
export function resolveCssLengthPx(varName: string): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return 0;

  if (raw.endsWith("px")) {
    const px = Number.parseFloat(raw);
    return Number.isFinite(px) ? px : 0;
  }

  const el = getProbe();
  el.style.setProperty("--length-probe", `var(${varName})`);
  const px = el.offsetHeight;
  el.style.removeProperty("--length-probe");
  return px;
}
