const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

async function parseResume(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  if (filePath.endsWith(".pdf")) {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } else if (filePath.endsWith(".docx")) {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
  }
  throw new Error("Unsupported file type");
}

module.exports = { parseResume };
