# Software Architecture Guild Web Site

This website is dedicated to sharing our knowledge with the world. It consists of three main sections:

* **Guide** : A practical, hands-on resource designed to empower developers, architects, and managers. Its primary goal is to serve as an educational roadmap for those eager to learn. More than just a collection of tips and tricks, this guide provides a structured approach to understanding key concepts, tools, and skills essential to software architecture. Think of it as a compass directing you toward the best resources, frameworks, and practices to support your growth.
* **Blog** : A space for sharing thoughts, discussing new ideas, and expressing perspectives on various topics related to software architecture. Whether it’s exploring emerging technologies, debating best practices, or reflecting on industry trends, our blog serves as a platform for insightful discussions and knowledge exchange.
* **Authors** : A section dedicated to the individuals who contribute to the creation and promotion of this website. Here, you can learn more about our contributors—their backgrounds, expertise, and passion for software architecture. These professionals help shape the content and ensure that the knowledge shared is valuable, relevant, and engaging.

## Table of Contents

* [Site Structure](#repository-structure)
* [Theme Split](#theme-split)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)

## Repository Structure

Repository follows the basic structure of a Hugo site with the Lotus Docs theme:

```bash
software-architecture-guild.github.io/
├── content/
│   ├── authors/
│   ├── blog/
│   ├── courses/
│   ├── guide/
│   └── ...
├── assets/
│   └── scss/
├── data/
├── images/
├── layouts/
├── themes/
│   └── lotusdocs/
├── hugo.yaml
├── AGENTS.md
└── README.md
```

* `content/authors/`: Markdown files with author profiles.
* `content/blog/`: Markdown files with blog posts.
* `content/courses/`: Course overview and outbound course links.
* `content/guide/`: Guide articles and learning-path content.
* `data/`: Structured data for the landing page and other Hugo data files.
* `images/`: Reusable site images referenced from content and layouts.
* `layouts/`: All non-guide templates, including landing page, blog, authors, courses, shared partials, and shortcodes.
* `assets/scss/`: All non-guide SCSS compiled for the landing page and the rest of the custom site chrome.
* `themes/lotusdocs/`: Theme source, now used primarily for guide-specific layouts and guide assets.
* `hugo.yaml`: Site configuration.
* `AGENTS.md`: Repository-specific working conventions for coding agents.

## Theme Split

The repository intentionally separates guide behavior from the rest of the site.

* Guide-only templates live in `themes/lotusdocs/layouts/guide/` and `themes/lotusdocs/layouts/partials/guide/`.
* Guide-only assets live in `themes/lotusdocs/assets/guide/`.
* All non-guide templates live in root `layouts/`.
* All non-guide SCSS lives in root `assets/scss/`.

When editing templates or styles:

* Keep guide changes inside the theme guide paths.
* Keep landing page, blog, authors, courses, and shared site chrome changes in root `layouts/` and `assets/scss/`.
* Avoid inline CSS in templates; add styles to the appropriate SCSS partial instead.

## Development

Use Hugo locally:

```bash
hugo server --buildDrafts
hugo build --gc --minify --baseURL http://localhost/
```

`hugo server --buildDrafts` runs the local preview at `http://localhost:1313/`.

`hugo build --gc --minify --baseURL http://localhost/` validates that the site renders successfully and matches the repository build settings.

## Contributing

Please review the **[CONTRIBUTING.md](CONTRIBUTING.md)**  for information on how to get started contributing to the project.

## License

All content in repository is licensed under [MIT license](LICENSE).
