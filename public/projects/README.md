# Case-study PDFs (MISSING — drop originals here)

Each project card opens its case-study PDF in a new tab. The original PDFs were
not present in the repo. Place them at these exact paths (or edit `pdfUrl` in
`lib/projects.ts`):

| Project    | Expected file                    |
| ---------- | -------------------------------- |
| NASCAR     | `public/projects/nascar.pdf`     |
| Shark Tank | `public/projects/shark-tank.pdf` |
| Phocas     | `public/projects/phocas.pdf`     |
| Visa       | `public/projects/visa.pdf`       |

If a PDF should not be linked yet, set its `pdfUrl` to `null` in
`lib/projects.ts`; the card stays clickable but will not open a new tab.
