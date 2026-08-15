const data = {
  happy: {
    emoji: "😄",
    theme: ["#ffd166", "#ff9a76"],
    affirmations: ["You're radiating good energy today.", "This joy looks amazing on you."],
    quotes: ["Keep shining, the world needs your light.", "Happiness looks good on you!", "Joy shared is joy doubled."],
    activities: ["Share your good mood with a friend.", "Dance to your favorite song.", "Take a goofy selfie and smile big."],
    songs: ["Happy - Pharrell Williams", "Good as Hell - Lizzo", "Walking on Sunshine - Katrina & The Waves"],
    movies: ["The Intouchables", "Paddington 2", "Sing Street"]
  },
  sad: {
    emoji: "🥺",
    theme: ["#6a8eae", "#a3c4dc"],
    affirmations: ["Your feelings are valid, and this moment will pass.", "Be as gentle with yourself as you would with a friend."],
    quotes: ["This too shall pass.", "It's okay to not be okay sometimes.", "Even the darkest night will end and the sun will rise."],
    activities: ["Write down 3 things you're grateful for.", "Take a slow walk outside.", "Wrap yourself in a blanket and have some tea."],
    songs: ["Fix You - Coldplay", "Here Comes the Sun - The Beatles", "Better Days - OneRepublic"],
    movies: ["Inside Out", "The Pursuit of Happyness", "A Silent Voice"]
  },
  stressed: {
    emoji: "😮‍💨",
    theme: ["#7f9c96", "#b6cfc4"],
    affirmations: ["You've handled hard things before — you can handle this too.", "One task at a time is enough."],
    quotes: ["Breathe. You've survived worse than this.", "One step at a time.", "Calm mind brings inner strength."],
    activities: ["Try 5 minutes of deep breathing.", "Stretch for 2 minutes.", "Make a short list and tackle just one thing."],
    songs: ["Weightless - Marconi Union", "Circles - Post Malone", "Breathe - Telepopmusik"],
    movies: ["Soul", "The Secret Life of Walter Mitty", "My Neighbor Totoro"]
  },
  bored: {
    emoji: "🥱",
    theme: ["#9b7fd4", "#c9a6f5"],
    affirmations: ["Boredom is just your brain asking for something new.", "A little curiosity can turn this around fast."],
    quotes: ["Boredom is the birthplace of creativity.", "Do something new today.", "An idle mind is a canvas waiting for color."],
    activities: ["Learn 3 words in a new language.", "Sketch anything for 5 minutes.", "Rearrange one small corner of your room."],
    songs: ["Uptown Funk - Bruno Mars", "Blinding Lights - The Weeknd", "Feel Good Inc. - Gorillaz"],
    movies: ["Zombieland", "Scott Pilgrim vs. the World", "The Grand Budapest Hotel"]
  },
  angry: {
    emoji: "😤",
    theme: ["#e15a5a", "#f28c8c"],
    affirmations: ["This feeling is valid, but it doesn't get to drive.", "You are in control, not the anger."],
    quotes: ["Anger is one letter short of danger.", "Pause before you react.", "Speak when you are calm, not when you are angry."],
    activities: ["Take 10 deep breaths.", "Go for a quick walk to cool off.", "Squeeze a pillow or do 10 pushups to release it."],
    songs: ["Let It Go - Idina Menzel", "Breathe Me - Sia", "Titanium - David Guetta ft. Sia"],
    movies: ["Kung Fu Panda", "School of Rock", "Ratatouille"]
  }
};

const buttons = document.querySelectorAll(".mood-btn");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const quote = document.getElementById("quote");
const activity = document.getElementById("activity");
const song = document.getElementById("song");
const movie = document.getElementById("movie");
const moodEmoji = document.getElementById("moodEmoji");
const affirmation = document.getElementById("affirmation");
const againBtn = document.getElementById("againBtn");
const detectBtn = document.getElementById("detectBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const statusEl = document.getElementById("status");
const video = document.getElementById("video");

let currentMood = null;

// Maps face-api.js expression labels to our mood categories
const expressionToMood = {
  happy: "happy",
  sad: "sad",
  angry: "angry",
  fearful: "stressed",
  disgusted: "angry",
  surprised: "happy",
  neutral: "bored"
};

const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";
let modelsLoaded = false;

async function loadModels() {
  if (modelsLoaded) return;
  statusEl.textContent = "Loading face detection models...";
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  modelsLoaded = true;
}

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
  video.srcObject = stream;
  return new Promise(resolve => {
    video.onloadedmetadata = () => resolve();
  });
}

function stopCamera() {
  const stream = video.srcObject;
  if (stream) stream.getTracks().forEach(track => track.stop());
  video.srcObject = null;
}

async function detectMoodFromFace() {
  detectBtn.disabled = true;
  try {
    await loadModels();
    statusEl.textContent = "Starting camera...";
    await startCamera();

    statusEl.textContent = "Reading your expression...";
    const scores = {};
    const samples = 15; // ~3 seconds at 200ms intervals

    for (let i = 0; i < samples; i++) {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        for (const [label, score] of Object.entries(detection.expressions)) {
          scores[label] = (scores[label] || 0) + score;
        }
      }
      await new Promise(r => setTimeout(r, 200));
    }

    stopCamera();

    if (Object.keys(scores).length === 0) {
      statusEl.textContent = "No face detected. Try again or pick manually.";
      detectBtn.disabled = false;
      return;
    }

    const topExpression = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const mood = expressionToMood[topExpression] || "bored";

    statusEl.textContent = `Detected: ${topExpression} → showing "${mood}" recommendation`;
    currentMood = mood;
    showRecommendation(mood);
  } catch (err) {
    statusEl.textContent = "Camera access denied or unavailable. Pick a mood manually below.";
    console.error(err);
  }
  detectBtn.disabled = false;
}

detectBtn.addEventListener("click", detectMoodFromFace);

surpriseBtn.addEventListener("click", () => {
  const moods = Object.keys(data);
  currentMood = pickRandom(moods);
  showRecommendation(currentMood);
});

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyTheme(colors) {
  document.body.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

function burstConfetti(emoji) {
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = emoji;
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
    piece.style.fontSize = 14 + Math.random() * 14 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

function showRecommendation(mood) {
  const moodData = data[mood];
  applyTheme(moodData.theme);

  moodEmoji.textContent = moodData.emoji;
  resultTitle.textContent = "Here's something for you";
  affirmation.textContent = "✨ " + pickRandom(moodData.affirmations);
  quote.textContent = "💬 " + pickRandom(moodData.quotes);
  activity.textContent = "🎯 Try this: " + pickRandom(moodData.activities);
  song.textContent = "🎵 Listen to: " + pickRandom(moodData.songs);
  movie.textContent = "🎬 Watch: " + pickRandom(moodData.movies);

  result.classList.remove("hidden");
  result.classList.remove("pop-in");
  void result.offsetWidth; // restart animation
  result.classList.add("pop-in");

  burstConfetti(moodData.emoji);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentMood = btn.dataset.mood;
    showRecommendation(currentMood);
  });
});

againBtn.addEventListener("click", () => {
  if (currentMood) showRecommendation(currentMood);
});
