# Mood Enhancer

A simple web app that detects your mood and suggests a quote, activity, song, and movie to match — or help shift — how you're feeling.

## Features
- Facial expression detection via webcam (using face-api.js) to auto-detect mood
- Manual mood selection as a fallback (Happy, Sad, Stressed, Bored, Angry)
- Personalized suggestions: affirmation, quote, activity, song, and movie
- Mood-based background theme and confetti animation
- "Surprise Me" button for a random mood pick
- Python version (`mood_logic.py`) with the same recommendation logic, runnable from the terminal

## Tech Stack
- HTML, CSS, JavaScript
- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for facial expression detection
- Python (standalone script)

## How to Run

### Web app
1. Clone this repo
2. Open `index.html` in any browser
3. Click **Detect My Mood** and allow camera access, or pick a mood manually

### Python script
```bash
python mood_logic.py
```
Then type a mood: `happy`, `sad`, `stressed`, `bored`, or `angry`

## Author
Rathod Pratham
