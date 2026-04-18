# Project Memory: Repository Guidelines

This repository is a Hugo site for the Software Architecture Guild. Treat it as a Markdown-first knowledge site with Hugo templates and SCSS around it.

Canonical source: `AGENTS.md`.

## Structure

- `content/guide/` contains structured learning content.
- `content/blog/` contains blog posts.
- `content/authors/` contains contributor profiles.
- `content/courses/` contains course pages.
- `data/` contains shared site data.
- `images/` contains reusable images.
- `hugo.yaml` contains site configuration.
- `public/` is generated output and must not be hand-edited.

The layout and asset split is intentional:

- Guide-only templates live in `themes/lotusdocs/layouts/guide/` and `themes/lotusdocs/layouts/partials/guide/`.
- Guide-only SCSS and JavaScript live in `themes/lotusdocs/assets/guide/`.
- Non-guide templates live in root `layouts/`.
- Non-guide SCSS lives in `assets/scss/`.

When editing templates or styles, keep guide-specific changes inside the theme guide paths and keep non-guide changes in the root layout and SCSS paths.

## Commands

Use Hugo locally:

```bash
hugo server --buildDrafts
hugo build --gc --minify --baseURL http://localhost/
```

`hugo server --buildDrafts` previews the site at `http://localhost:1313/`. `hugo build --gc --minify --baseURL http://localhost/` validates rendering with CI-like build settings.

Content checks:

```bash
markdownlint-cli2 "**/*.md" "#themes"
cspell lint .
```

There is no unit-test suite. For Markdown changes, run markdownlint on changed Markdown files when available. For broad content or spelling changes, run `cspell lint .`. For layout, navigation, image, or Hugo behavior changes, run `hugo build`.

## Memory Maintenance

When a change alters durable project knowledge, update the relevant `.opencode/memory/` file in the same change:

- Update `project-guidelines.md` when repo structure, commands, validation, analytics, style rules, or workflow expectations change.
- Update `guide-index.md` when guide sections, page paths, page purpose, or the learning map changes.
- Update `substack-archive.md` when Substack posts, article mappings, or reuse guidance changes.
- Update `reading-list.md` when recommended books, canonical references, book reviews, or page-to-reference mappings change.

Do not update memory for one-off implementation details that are unlikely to matter to future sessions.

## Content Style

- Match existing Hugo front matter style: YAML between `---`, 2-space indentation for nested values, and fields such as `title`, `description`, `date`, `lastmod`, `draft`, and `authors`.
- Keep filenames descriptive and lowercase with hyphens where practical.
- Follow `instructions.md` for guide articles: clear headings, short paragraphs, explicit trade-offs, and skimmable bullets.

## Templates And Styles

- Prefer the smallest correct change.
- Avoid inline CSS in templates.
- Preserve the guide vs. non-guide split instead of duplicating the same concern in both places.

## Analytics

- Keep analytics event names meaningful and funnel-oriented, for example `guide_entry_click`, `courses_navigation_click`, `substack_outbound_click`, `udemy_outbound_click`, and `guide_feedback_submitted`.
- Keep guide and non-guide event taxonomy aligned when they represent the same user intent.
- For tracked template links, prefer `data-track-event`, `data-track-label`, and `data-track-param-*` attributes over inline JavaScript.
- Always write `data-track-param-*` names in kebab-case, for example `data-track-param-entry-point` and `data-track-param-course-title`, so the tracker emits snake_case GA parameters such as `entry_point` and `course_title`.

## Pull Requests

Use short, scoped, imperative commit subjects. PRs should explain what changed, why it changed, and link related issues or discussions. For content changes, note the affected section. For visual or layout changes, include screenshots. CODEOWNERS review and passing `pull_request` CI are expected before merge.
