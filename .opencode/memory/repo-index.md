# Website Repo Index

Use this file as the routing map and catalog for the Hugo website repository.

Paths below are relative to this repository unless marked as workspace-relative.

## Content Memory

- `.opencode/memory/reading-index.md` - website-owned book-to-topic mapping for
  guide content. Follow its relative link to the social-posts Substack catalog
  when selecting a published book-review URL.
- `social-posts/.opencode/memory/substack-index.md` (workspace-relative) - canonical
  published Substack article/review URLs, known draft status, and reuse notes.
- `.opencode/memory/guide-index.md` - website-owned guide information architecture
  and content-placement map.

## Architecture

This is a static site built with Hugo.

- `hugo.yaml`: Main configuration file defining the site URL, menus, and theme settings.
- `content/`: Contains the Markdown files representing the actual pages of the site.
  - `content/guide/`: The public Software Architecture Guide pages.
  - `content/courses/`: Landing pages for the Guild's courses.
  - `content/blog/`: Archive or references to blog posts.
- `layouts/`: Custom Hugo HTML templates that override or extend the base theme.
- `assets/`: SCSS, JavaScript, and other asset pipeline files.
- `images/`: Core image assets used across the site.
- `themes/`: Git submodules or cloned directories for the Hugo theme in use.

## Workflows

When editing content in this repository:

1. Focus purely on Hugo-specific rendering, shortcodes, and site layout.
2. When changing book-to-topic recommendations, update the repo-local reading
   index. Maintain new or changed Substack publication metadata in the social-posts
   catalog and use its URLs in guide content. Update the repo-local guide index
   when the guide's information architecture changes.
