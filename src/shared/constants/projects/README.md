# Adding a project

Short checklist. Card data lives in `data.ts`; long copy and galleries live here as Markdown.

## 1. Card entry (`src/shared/constants/data.ts`)

Add an object to `PROJECTS`:

```ts
{
  title: "My Project",
  description: "One-line summary for the board and SEO fallback.",
  tags: ["JsonUI", "Server Form"],       // optional; used in search
  imgSrc: "thumbnail",                   // required for card image
  logoSrc: "logo",                       // optional; corner badge on card
  url: "my_project",                     // slug → detail page; omit for board-only
  type: "commissions",                   // "personal" | "commissions" — board tabs
  star: true,                            // optional; featured tab + sort boost
  downloadLink: "https://...",           // optional; detail page button
}
```

**Slug rules:** `url` must be `snake_case`, unique, and match filenames below (`my_project` → `my_project.md`, image folder `my_project/`).

## 2. Thumbnail (`public/images/projects/`)

```
public/images/projects/my_project/thumbnail.png
```

- Path: `/images/projects/{url or "thisweb"}/{imgSrc}.png`
- Card uses 16:9; PNG recommended.
- Detail screenshots use the same folder; names match `imageSrc` in Markdown.

## 3. Detail page — optional (`my_project.md` in this folder)

Copy an existing file (e.g. `simple_ui.md`). Frontmatter options:

| Field                              | Purpose                                        |
| ---------------------------------- | ---------------------------------------------- |
| `title`                            | Page H1 (overrides card title)                 |
| `description`                      | SEO / intro if needed                          |
| `content`                          | Body below buttons (markdown after `---`)      |
| `extraButtons`                     | `{ text, href, external? }[]` before Contact   |
| `credits`                          | `{ role, name, href? }[]`                      |
| `videos`                           | `{ title, description, youtubeId }[]`          |
| `imageSections`                    | `{ title, description, rowStyle?, items[] }[]` |
| `imageSections[].items[].imageSrc` | filename without `.png` in project folder      |

No `.md` file → detail route still works if `url` is set; page shows card description and “coming soon”.

## 4. Optional extras

| Goal                 | Where                                            |
| -------------------- | ------------------------------------------------ |
| Home “Selected Work” | `getHomeSelectedProjects()` in `data.ts` (internal URL list) |
| Featured tab         | `star: true` on the project                      |
| Sitemap              | automatic when `url` is set                      |
| Detail URL helper    | `projectDetailPath("my_project")` in `routes.ts` |

## 5. Verify

1. `/projects` — card appears, search/tags/tabs work
2. `/projects/my_project` — detail renders
3. `yarn build` — static page generated

**Board-only example:** “This Website” — has `imgSrc`, no `url`, no `.md`.
