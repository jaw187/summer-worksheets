# Summer Worksheets

Printer-friendly summer worksheets for elementary school children, with grade-readiness notes for families and educators.

The project is intentionally simple: each worksheet is a standalone HTML document that can be opened directly or served by the included Node dev server. Worksheets can include images from `assets/` and should include print styles so they work cleanly on US Letter paper.

## Quick Start

```bash
npm run dev
```

Then open `http://localhost:4173`.

To use another port:

```bash
PORT=3000 npm run dev
```

## Project Structure

```text
assets/                         Shared worksheet images
docs/grade-guides/              Grade-readiness lesson documentation
worksheets/<grade>/<topic>/      Printer-friendly worksheet documents
```

## Worksheet Guidelines

- Keep each worksheet self-contained in its own `index.html`.
- Use print-friendly CSS with generous margins, dark text, and minimal background color.
- Target one clear practice session, usually 15 to 30 minutes.
- Include a short caregiver note with the goal of the activity.
- Favor concrete, age-appropriate prompts over long explanations.
- Use images when they support counting, sorting, observation, vocabulary, or storytelling.

## Current Worksheets

- [Entering Kindergarten: Fall Ready Practice](worksheets/entering-kindergarten/fall-ready/index.html)
- [Entering Kindergarten: Rhyming Words](worksheets/entering-kindergarten/rhyming-words/index.html)

## Grade Guides

- [Entering Kindergarten](docs/grade-guides/entering-kindergarten.md)
- [Entering 1st Grade](docs/grade-guides/entering-1st-grade.md)
- [Entering 2nd Grade](docs/grade-guides/entering-2nd-grade.md)
- [Entering 3rd Grade](docs/grade-guides/entering-3rd-grade.md)
- [Entering 4th Grade](docs/grade-guides/entering-4th-grade.md)
- [Entering 5th Grade](docs/grade-guides/entering-5th-grade.md)
