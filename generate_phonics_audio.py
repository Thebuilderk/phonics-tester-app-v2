import os
import glob
import time
import requests
import pandas as pd
import json

# Configuration
API_KEY = "sk_b9bcd3381449abfeebd71e366148fec34601fd1675dc9e6b"
VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2" # British Accent (Alice)
MODEL_ID = "eleven_multilingual_v2"
DOCS_DIR = "Phonics_docs"
OUTPUT_DIR = "assets/sounds"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Extract all unique words across all .xlsx files in all subfolders
unique_words = set()
excel_files = glob.glob(os.path.join(DOCS_DIR, "**", "*.xlsx"), recursive=True)

print(f"Found {len(excel_files)} Excel file(s) in '{DOCS_DIR}'.")

for file in excel_files:
    try:
        xls = pd.ExcelFile(file)
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(file, sheet_name=sheet_name, header=None)
            for cell in df.values.flatten():
                if pd.notna(cell):
                    # Clean text
                    word = str(cell).strip().lower()
                    # Filter out non-alphabetic/header strings if necessary
                    if word and word.isalpha():
                        unique_words.add(word)
    except Exception as e:
        print(f"Error reading file '{file}': {e}")

print(f"Extracted {len(unique_words)} unique phonics words.")

# 2. Call ElevenLabs API for missing audio files
headers = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

generated_count = 0
for word in sorted(unique_words):
    file_path = os.path.join(OUTPUT_DIR, f"{word}.mp3")
    
    # Generate missing files
    if not os.path.exists(file_path):
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
        payload = {
            "text": word,
            "model_id": MODEL_ID,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
        }
        
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            with open(file_path, "wb") as f:
                f.write(response.content)
            print(f"Generated: {word}.mp3")
            generated_count += 1
        else:
            print(f"Failed to generate '{word}': {response.status_code} - {response.text}")
        
        # Rate limiting delay
        time.sleep(0.5)

print(f"Done! {generated_count} new audio files generated in '{OUTPUT_DIR}'.")

# Save unique words to a JSON file
words_output_path = os.path.join(DOCS_DIR, "words.json")
with open(words_output_path, "w") as f:
    json.dump(sorted(list(unique_words)), f, indent=2)
print(f"Saved unique words to {words_output_path}")