# Repository Guidelines

This is a Hugo site for the Software Architecture Guild. Keep this file short and use the project-local opencode memory files for detailed guidance:

- `.opencode/memory/project-guidelines.md`
- `.opencode/memory/guide-index.md`
- `.opencode/memory/substack-archive.md`
- `.opencode/memory/reading-list.md`

## Essential Rules

- Do not hand-edit `public/`; it is generated output.
- Keep guide-specific templates and partials under `themes/lotusdocs/layouts/guide/` and `themes/lotusdocs/layouts/partials/guide/`.
- Keep guide-specific SCSS and JavaScript under `themes/lotusdocs/assets/guide/`.
- Keep non-guide templates in root `layouts/`.
- Keep non-guide SCSS in `assets/scss/`.
- Follow `instructions.md` for guide article tone and structure: clear headings, short paragraphs, explicit trade-offs, and skimmable bullets.
- Match existing Hugo front matter style: YAML between `---`, 2-space indentation for nested values, and fields such as `title`, `description`, `date`, `lastmod`, `draft`, and `authors`.
- Prefer the smallest correct change and preserve the existing guide vs. non-guide split.

## Memory Maintenance

When a change alters durable project knowledge, update the relevant `.opencode/memory/` file in the same change. This includes repo structure, build or validation commands, guide organization, Substack/archive mappings, reading references, analytics conventions, or recurring workflow rules.

## Validation

Use the checks that match the scope of the change:

```bash
hugo build --gc --minify --baseURL http://localhost/
markdownlint-cli2 "**/*.md" "#themes"
cspell lint .
```

For layout, navigation, image, or Hugo behavior changes, run `hugo build`. For Markdown changes, run markdownlint on changed Markdown files when available. For broad content or spelling changes, run `cspell lint .`.
