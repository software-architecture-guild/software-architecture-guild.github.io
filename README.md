# Software Architecture Guild Web Site

This website is dedicated to sharing our knowledge with the world. It consists of three main sections:

* **Guide** : A practical, hands-on resource designed to empower developers, architects, and managers. Its primary goal is to serve as an educational roadmap for those eager to learn. More than just a collection of tips and tricks, this guide provides a structured approach to understanding key concepts, tools, and skills essential to software architecture. Think of it as a compass directing you toward the best resources, frameworks, and practices to support your growth.
* **Blog** : A space for sharing thoughts, discussing new ideas, and expressing perspectives on various topics related to software architecture. Whether it’s exploring emerging technologies, debating best practices, or reflecting on industry trends, our blog serves as a platform for insightful discussions and knowledge exchange.
* **Authors** : A section dedicated to the individuals who contribute to the creation and promotion of this website. Here, you can learn more about our contributors—their backgrounds, expertise, and passion for software architecture. These professionals help shape the content and ensure that the knowledge shared is valuable, relevant, and engaging.

## Table of Contents

* [Site Structure](#repository-structure)
* [Contributing](#contributing)
* [License](#license)

## Repository Structure

Repository follows the basic structure of Hugo site with the Lotus Docs theme is as follows:

```bash
software-architecture-guild/
├── content/
|   ├── authors/
│   ├── blog/
│   ├── guide/
│   └── _index.md
├── data/
├── images/
├── layouts/
├── static/
├── themes/
│   └── lotusdocs/
├── hugo.yaml
└── README.md
```

* content/authors: Markdown files with author profiles.
* content/blog: Markdown files with blog.
* content/guide: Markdown files with guide articles.
* data/: Configuration file for landing page.
* images/: Images published as static files and are referenced from Markdown files.
* layouts/: Custom layout files.
* static/: Static files like images, CSS, and JavaScript.
* themes/lotusdocs/: The Lotus Docs theme files.
* hugo.yaml: Configuration file for your site.
* README.md: This file.

## Contributing

Please review the **[CONTRIBUTING.md](CONTRIBUTING.md)**  for information on how to get started contributing to the project.

## License

All content in repository is licensed under [MIT license](LICENSE).
