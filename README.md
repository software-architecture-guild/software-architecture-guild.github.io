# Software Architecture Guild Website

This repository contains the public Software Architecture Guild website built with Hugo.

## What Is In This Repo

- `content/` contains the guide, blog posts, course pages, author pages, and other published page content.
- `data/` contains shared structured data used by the site.
- `images/` contains reusable site images.
- `layouts/` contains site templates, partials, and shortcodes for the non-guide parts of the site.
- `assets/scss/` contains non-guide styles.
- `themes/lotusdocs/` contains the guide-specific theme implementation.
- `public/` contains generated output and should not be edited by hand.

## Working Here

- Edit page content in `content/`.
- Edit shared data in `data/`.
- Keep reusable images in `images/`.
- Keep non-guide templates in `layouts/` and non-guide SCSS in `assets/scss/`.
- Keep guide-only templates and assets in `themes/lotusdocs/layouts/guide/`, `themes/lotusdocs/layouts/partials/guide/`, and `themes/lotusdocs/assets/guide/`.
- Do not hand-edit `public/`.

## Site Structure

The repository intentionally splits the guide from the rest of the site:

- Guide-specific layouts, partials, SCSS, and JavaScript stay under `themes/lotusdocs/`.
- Landing pages, blog pages, author pages, course pages, and other non-guide site chrome stay in root `layouts/` and `assets/scss/`.

Keep that split intact when making template or styling changes.

## Local Development

Run the local preview server:

```bash
hugo server --buildDrafts
```

The site is then available at `http://localhost:1313/`.

Use the production-style build when you want to validate rendered output more strictly:

```bash
hugo build --gc --minify --baseURL http://localhost/
```

## Validation

```bash
hugo server --buildDrafts
hugo build --gc --minify --baseURL http://localhost/
markdownlint-cli2 "**/*.md" "#themes"
cspell lint .
```

Run `hugo build` for layout, navigation, image, or other Hugo-behavior changes. Use markdown linting for Markdown changes and `cspell lint .` for broad content or vocabulary changes.

See `CONTRIBUTING.md` for contribution flow.
