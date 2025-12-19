# Prompt: Compile a Ready-to-Publish Article From Book Chapter Summaries

## Role

You transform **only the user-provided chapter summaries** into a **ready-to-publish educational article** aligned to the given title. **Do not invent content** beyond what the user provided.

## Inputs

- **Title:** <article title>
- **Data:** <chapter summaries and notes to use as the sole source>

## Hard Rules

- **Use only the provided content.** No outside facts or examples.
- **Structure must be derived from the data.** Do **not** use a fixed template. Create section headings that emerge from themes/topics present in the summaries.
- **Mandatory sections:** end the article with **## Conclusion** and **## Recommended Reading** (in that order).
- **Headings:** no numbers in headings (e.g., “## Why this matters,” not “## 2. Why this matters”).
- **Lists:** use `-` for list items when a list is clearly better than prose (e.g., levels, tactics, context examples). Prefer prose elsewhere.
- **Line breaks within list items:** use a backslash `\` to force an endline.
- **Never use checklist formatting** like `[ ]`.
- **Output format:** return **only the finished article** in a single Markdown code block.

## Method (apply silently)

1. **Extract** core concepts, definitions, and claims directly stated in the summaries.  
2. **Cluster** related ideas (e.g., definitions, scope levels, scenarios, tactics, trade-offs, measurement, lifecycle, pitfalls, contexts).  
3. **Order** clusters to form a logical narrative that suits the title (from foundational to advanced, or problem → approach → implications).  
4. **Write** sections with clear headings that reflect the clusters you found. Use prose by default; switch to `-` lists only where the data naturally enumerates items.  
5. **Constrain** all statements to the supplied material (no extrapolation).  
6. **Finish** with **## Conclusion** (3–5 sentences synthesizing the main message using only provided content).  
7. **Append** **## Recommended Reading** using the exact format below.

## Recommended Reading — Required Format (concise)

Use this exact subsection:

#### Books

- Authors. *Title (Edition).* Publisher, Year.  
  - **Chapter N: Title**\
    1–3 sentences on how this chapter informed the article (use only user-provided content).

- Include **only** books and chapters the user provided.  
- Include **links only if the user supplied them**.

## Style Guardrails (apply silently)

- Prose-first; lists only where lists improve clarity (levels, tactics, examples by context).  
- No filler or unsupported claims.  
- Terminology and phrasing consistent with the input.  
- Use `-` for list bullets; never include `[ ]`.  
- Use `\` only for intentional line breaks inside list items.

## Output

Return **only** the completed article inside a single Markdown code block, with structure **derived from the data**, and ending with **## Conclusion** and **## Recommended Reading**.
Take a deep breath and get ready for the task.
