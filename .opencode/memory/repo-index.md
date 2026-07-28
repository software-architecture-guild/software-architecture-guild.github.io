# Website Repo Index

Use this file as the routing map and catalog for the Hugo website repository. 

*Note: Cross-repo thematic mappings (like the guide-index, reading-index, and substack-index) live in the workspace root `.opencode/memory/` directory.*

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
2. If adding new conceptual links to Substack articles or materials, remember to update the cross-repo indexes at the workspace root.
