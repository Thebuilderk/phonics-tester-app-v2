const fs = require('fs');
const path = require('path');

const soundsFolder = path.join(__dirname, 'assets', 'sounds');
const docsFolder = path.join(__dirname, 'Phonics_docs');
const outputDir = path.join(__dirname, 'src');
const outputPath = path.join(outputDir, 'phonicsData.json');

function generateData() {
  const audioFiles = fs.existsSync(soundsFolder) ? fs.readdirSync(soundsFolder) : [];
  const docFiles = fs.existsSync(docsFolder) ? fs.readdirSync(docsFolder) : [];

  const parsedData = {
    audioMap: {},
    documents: [],
  };

  // 1. Index Audio Files from assets/sounds/
  audioFiles.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (['.mp3', '.wav', '.m4a'].includes(ext)) {
      const soundKey = path.basename(file, ext).toLowerCase(); // e.g., 'bell', 'fox'
      parsedData.audioMap[soundKey] = `./assets/sounds/${file}`;
    }
  });

  // 2. Index Documents from Phonics_docs/
  docFiles.forEach((file, index) => {
    const filePath = path.join(docsFolder, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      parsedData.documents.push({
        id: String(index + 1),
        fileName: file,
        extension: ext,
        fileSizeBytes: stats.size,
      });
    }
  });

  // Ensure 'src' directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2));
  console.log(`Successfully generated phonics data at: ${outputPath}`);
}

generateData();