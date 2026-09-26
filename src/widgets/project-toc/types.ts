export interface ProjectTocItem {
  id: string;
  label: string;
  /** Extra section ids that keep this TOC item active (e.g. all videos). */
  watchIds?: string[];
  /** Items inside the section, for the "6/24" position counter. */
  itemCount?: number;
}
