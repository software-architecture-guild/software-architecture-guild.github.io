# Repository Guidelines

## Project Structure & Module Organization

This repository is a Hugo site for the Software Architecture Guild. Most work happens in `content/`, split by section: `content/guide/` for structured learning content, `content/blog/` for posts, `content/authors/` for contributor profiles, and `content/courses/` for course pages. Shared site data lives in `data/`, reusable images in `images/`, custom overrides in `layouts/`, and site configuration in `hugo.yaml`. The generated site output is written to `public/` and should not be hand-edited.

## Build, Test, and Development Commands

Use Hugo locally:

```bash
hugo server --buildDrafts
hugo build --gc --minify --baseURL http://localhost/
```

`hugo server --buildDrafts` runs the local preview at `http://localhost:1313/`. `hugo build` validates that the site renders successfully and mirrors the CI build settings. Content quality checks:

```bash
markdownlint-cli2 "**/*.md" "#themes"
cspell lint .
```

## Coding Style & Naming Conventions

This is a Markdown-first repo. Match the existing Hugo front matter style: YAML between `---`, 2-space indentation for nested values, and fields such as `title`, `description`, `date`, `lastmod`, `draft`, and `authors`. Keep filenames descriptive and lowercase with hyphens where practical for assets, for example `images/architecture/microservices-tradeoffs.png`. Follow the structure and tone in `instructions.md` for guide articles: clear headings, short paragraphs, explicit trade-offs, and skimmable bullets.

## Testing Guidelines

There is no unit-test suite. Validation means:

1. Run `markdownlint-cli2` on changed Markdown files.
2. Run `cspell lint .`; add approved terms to `project-words.txt`.
3. Run `hugo build` before opening a PR.

If you change layouts, navigation, or images, verify the affected pages in the local Hugo server.

## Commit & Pull Request Guidelines

Recent history uses short, scoped subjects such as `Content: Architecture -> Validation` and `docs: add copilot instructions for guild website`. Keep commits focused and imperative. Open contributions as pull requests only. PRs should explain what changed, why it changed, and link any related issue or discussion. For content changes, note the affected section; for visual or layout changes, include screenshots. The repository expects review from CODEOWNERS, and `pull_request` CI must pass before merge.
