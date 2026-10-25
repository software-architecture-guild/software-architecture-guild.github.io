# Website Guidelines

Repository: `website/`

This repository is a Hugo site for the Software Architecture Guild. Treat it as a Markdown-first knowledge site with Hugo templates and SCSS around it.

## Where To Change

- Edit page content in `content/`, including guide, blog, author, and course pages.
- Edit shared data in `data/`.
- Keep reusable images in `images/`.
- Keep non-guide templates, partials, and shortcodes in root `layouts/`.
- Keep non-guide SCSS in `assets/scss/`.
- Keep guide-only templates and partials in `themes/lotusdocs/layouts/guide/` and `themes/lotusdocs/layouts/partials/guide/`.
- Keep guide-only SCSS and JavaScript in `themes/lotusdocs/assets/guide/`.
- Do not hand-edit `public/`; it is generated output.

Keep the guide and non-guide split intact instead of duplicating the same concern in both places.

## How To Work

- Match existing Hugo front matter style: YAML between `---`, 2-space indentation for nested values.
- Keep filenames descriptive and lowercase with hyphens where practical.
- Prefer the smallest correct change and avoid inline CSS in templates.
- For tracked links, prefer `data-track-event`, `data-track-label`, and `data-track-param-*` attributes over inline JavaScript.
- Keep `data-track-param-*` names in kebab-case.
- Use meaningful, funnel-oriented analytics event names such as `guide_entry_click`, `courses_navigation_click`, `substack_outbound_click`, `udemy_outbound_click`, and `guide_feedback_submitted`.
- Read the repo-local `.opencode/memory/repo-index.md` for routing and maintain
  guide book-to-topic mappings in `.opencode/memory/reading-index.md`.
- For published article and review URLs, follow the reading index's link to
  `social-posts/.opencode/memory/substack-index.md` (workspace-relative). Maintain
  Substack publication metadata in that canonical catalog.
- Use the repo-local `.opencode/memory/guide-index.md` for guide information
  architecture. Keep repository-specific catalogs in this repository's `.opencode/memory/`.

## Validation

```bash
hugo server --buildDrafts
hugo build --gc --minify --baseURL http://localhost/
markdownlint-cli2 "**/*.md" "#themes"
cspell lint .
```

Run `hugo build` for layout, navigation, image, or Hugo behavior changes. Run markdown linting for Markdown changes and `cspell lint .` for broad content or spelling changes.
