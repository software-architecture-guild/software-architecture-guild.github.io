# Software Architecture Guild site

Table of Contents

- [Quick Start](#quick-start)
- [Site Structure](#site-structure)

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- Go ≥ v1.19
- Hugo ≥ v0.117.0 (Extended Version)

### Local development

1. Run hugo site locally:

   ```bash
   hugo server -D
   ```

2. Open your browser and visit: [http://localhost:1313](http://localhost:1313)

## Site Structure

The basic structure of your Hugo site with the Lotus theme is as follows:

```bash
software-architecture-guild/
├── archetypes/
├── content/
│   ├── blogs/
│   ├── guide/
│   └── _index.md
├── data/
├── layouts/
├── static/
├── themes/
│   └── lotus/
├── config.toml
└── README.md
```

- archetypes/: Templates for new content.
- content/: Markdown files for your site content.
- data/: Additional data files for Hugo to use.
- layouts/: Custom layout files.
- static/: Static files like images, CSS, and JavaScript.
- themes/lotus/: The Lotus theme files.
- config.toml: Configuration file for your site.
- README.md: This file.

## Linting

### Markdown

1. Install markdown lint:

   ```bash
   sudo npm install -g markdownlint-cli2
   ```

2. Run markdown lint:

   ```bash
   markdownlint-cli2 "**/*.md" "#node_modules" "#themes"
   ```

3. Fix automatically:

   ```bash
   markdownlint-cli2 "**/*.md" "#node_modules" "#themes" --fix
   ```

### Spell Check

1. Install cspell:

   ```bash
   sudo npm install -g cspell@latest
   ```

2. Run cspell lint:

   ```bash
   cspell lint .
   ```
