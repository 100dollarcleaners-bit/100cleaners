import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mdToPdf } from "md-to-pdf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "content/academy/downloads");
const outputDir = path.join(root, "content/academy/pdfs");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

async function main() {
  const mdFiles = walk(sourceDir);
  console.log(`Generating ${mdFiles.length} PDFs...`);

  for (const mdPath of mdFiles) {
    const relative = path.relative(sourceDir, mdPath);
    const pdfRelative = relative.replace(/\.md$/, ".pdf");
    const pdfPath = path.join(outputDir, pdfRelative);
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

    await mdToPdf(
      { path: mdPath },
      {
        dest: pdfPath,
        pdf_options: {
          format: "Letter",
          margin: { top: "0.75in", bottom: "0.75in", left: "0.75in", right: "0.75in" },
          printBackground: true,
        },
        stylesheet: path.join(root, "scripts/academy-pdf.css"),
      }
    );

    console.log(`  ✓ ${pdfRelative}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
