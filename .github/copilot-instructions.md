# Copilot Instructions: Software Architecture Guild Website

## Project Overview

Hugo-based static website dedicated to sharing software architecture knowledge. Three main sections: **Guide** (educational roadmap), **Blog** (thoughts and discussions), **Authors** (contributor profiles). Built with Lotus Docs theme.

## Repository Structure

```bash
software-architecture-guild.github.io/
├── content/
│   ├── _index.md (homepage)
│   ├── privacy-policy.md
│   ├── authors/ (contributor profiles)
│   ├── blog/ (articles and discussions)
│   ├── blogs/ (legacy)
│   ├── courses/ (course overviews/links)
│   └── guide/ (structured learning content)
├── data/
│   └── landing.yaml (landing page config)
├── images/ (organized by category)
│   ├── architecture/
│   ├── authors/
│   ├── blog/
│   └── ...
├── layouts/ (custom layout files)
├── themes/
│   └── lotusdocs/ (Lotus Docs theme)
├── static/ (CSS, JavaScript, static files)
├── hugo.yaml (Hugo configuration)
├── cspell.config.yaml
├── project-words.txt
├── CONTRIBUTING.md (contributor guidelines)
├── CODE_OF_CONDUCT.md
├── LICENSE (MIT)
└── README.md
```

## Content Organization

### Guide Section

Structured learning content organized by topic domains:

- Architecture fundamentals and decision-making
- Competencies (modeling, communication, collaboration)
- Advanced topics (domain-driven design, organizational patterns)

**Style:** Practical, hands-on resource. Each article serves as an educational roadmap. Not just tips, but structured approaches to concepts, tools, and skills.

**Voice:** See [instructions.md](../instructions.md) — Ilya's style: conversational, direct, mentor-to-peer, concise and skimmable.

### Blog Section

Space for sharing thoughts, discussing ideas, expressing perspectives on software architecture.

**Content Types:**

- Emerging technology explorations
- Best practices debates
- Industry trend reflections
- Knowledge exchange and discussions

**Length:** Typically 800–1500 words. Can be more if warranted.

## Article Structure (Guide)

Follow [instructions.md](../instructions.md) for detailed formatting, but core pattern:

1. **Title** — one-sentence payoff/summary
2. **What is X?** — 1–2 paragraphs, technology-neutral
3. **Why it matters** — owner value + risks, include at least **one explicit trade-off**
4. **How to do it** — 5–10 bullets with quality attributes or risks tied to each
5. **Examples / Pitfalls** — 3 items max, each with concrete pass and why it works
6. **Conclusion** — 3–5 bullet takeaways
7. **Recommended Reading** — see format in [instructions.md](../instructions.md)

**Length:** Aim for 700–1,100 words. Prioritize clarity over coverage.

## Key Principles

- **Traceability:** All content grounded in source material (books, documented patterns)
- **Quality Attributes:** Every recommendation maps to performance, scalability, security, modifiability, etc.
- **Trade-offs:** Explicitly call out speed vs. formality, discovery vs. iteration, etc.
- **Skimmability:** Clear headings, short paragraphs, bullet points for action items
- **No Speculation:** Only documented patterns, not aspirational practices

## Images

Stored in `images/` organized by category:

- `architecture/` — Architecture diagrams, decision trees, patterns
- `authors/` — Profile photos
- `blog/` — Article-specific images
- Other categories as needed

**Naming:** Descriptive, lowercase with hyphens (e.g., `microservices-tradeoffs.png`)

**Optimization:** Keep images web-optimized, compressed for fast loading.

## Front Matter (Hugo)

Standard Hugo front matter in Markdown files:

```yaml
---
title: Article Title
description: Short description for SEO
date: 2025-01-17
categories: [category1, category2]
---
```

## Spell Checking

```bash
cspell check '**/*.md'
```

Uses `cspell.config.yaml` and `project-words.txt` for custom dictionary.

## Hugo Development

```bash
hugo server --buildDrafts  # Local preview with drafts
hugo build                 # Generate static site in public/
```

**Theme:** Lotus Docs (customizable layouts in `layouts/`)

## Contributing Guidelines

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed process. High-level:

- Propose new topics or major changes before writing
- Follow Ilya's style guide ([instructions.md](../instructions.md))
- Link to source materials and related articles
- Include examples that are testable/observable when possible
- Use consistent terminology and cross-link

## Critical Patterns

- **Single Source of Truth:** Coordinate with materials library and social posts—don't duplicate content
- **Cross-linking:** Link guide articles to relevant social posts, courses, and materials
- **Platform Consistency:** Tone and messaging should align across blog, guide, and social channels
- **Author Attribution:** All content should credit author in front matter and author profile
