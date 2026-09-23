const fs = require('fs');
const path = require('path');

// Helper to generate placeholder segments for words
function generateSegments(word) {
  // Simple placeholder: every character is a dot segment
  return word.split('').map(char => ({ text: char, type: 'dot' }));
}

const soundsFolder = path.join(__dirname, 'assets', 'sounds');
const alienImagesFolder = path.join(__dirname, 'assets', 'aliens');
const docsFolder = path.join(__dirname, 'Phonics_docs');
const outputDir = path.join(__dirname, 'src');
const outputPath = path.join(outputDir, 'phonicsData.json');

function generateData() {
  const audioFiles = fs.existsSync(soundsFolder) ? fs.readdirSync(soundsFolder) : [];
  const alienImageFiles = fs.existsSync(alienImagesFolder) ? fs.readdirSync(alienImagesFolder) : [];
  const docFiles = fs.existsSync(docsFolder) ? fs.readdirSync(docsFolder) : [];

  const parsedData = {
    audioMap: {},
    phonicsCurriculum: [],
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

  // 3. Generate Phonics Curriculum from words.json
  const wordsFilePath = path.join(docsFolder, 'words.json');
  if (fs.existsSync(wordsFilePath)) {
    const allWords = JSON.parse(fs.readFileSync(wordsFilePath, 'utf8'));

    // Temporary definition of 'real words' based on App.tsx sample
    const realWords = new Set(['chin', 'cat', 'shark', 'gloom']);

    const alienImagePaths = alienImageFiles.map(file => `./assets/aliens/${file}`);

    allWords.forEach((word, index) => {
      const isAlienWord = !realWords.has(word);
      const alienImagePath = isAlienWord && alienImagePaths.length > 0
        ? alienImagePaths[Math.floor(Math.random() * alienImagePaths.length)]
        : undefined;

      parsedData.phonicsCurriculum.push({
        id: index + 1,
        word: word,
        isAlien: isAlienWord,
        phonicsType: isAlienWord ? 'Alien Word' : 'Placeholder Type',
        phase: isAlienWord ? 5 : 3, // Placeholder phase
        segments: generateSegments(word),
        alienImagePath: alienImagePath, // Add alien image path
      });
    });
  } else {
    console.warn('words.json not found. Phonics curriculum will be empty.');
  }

  // Ensure 'src' directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2));
  console.log(`Successfully generated phonics data at: ${outputPath}`);
}

generateData();