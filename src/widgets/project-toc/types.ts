export interface ProjectTocItem {
  id: string;
  label: string;
  /** Extra section ids that keep this TOC item active (e.g. all videos). */
  watchIds?: string[];
}
