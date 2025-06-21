const blob = document.getElementById("blob");
const countText = document.getElementById("count");
const bgMusic = document.getElementById("bg-music");
const accessory = document.getElementById("accessory");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");
const squishSounds = [
  document.getElementById("squish1"),
  document.getElementById("squish2"),
];
const volumeSlider = document.getElementById("volume-slider");

let count = parseInt(localStorage.getItem("pats")) || 0;
updateDisplay();

const messages = [
  { milestone: 5, text: "You found the sweet spot! 🍬" },
  { milestone: 10, text: "Blob is feeling the love! 💞" },
  { milestone: 20, text: "You are a pro petter! 🐾" },
  { milestone: 35, text: "Blob has evolved! 👑" },
  { milestone: 50, text: "You’ve unlocked blob wings! 🪽" },
  { milestone: 75, text: "Blob learned to dance! 💃" },
  { milestone: 100, text: "Blob sings with joy! 🎤" },
  { milestone: 125, text: "Blob can now fly! 🪶" },
  { milestone: 150, text: "Blob's heart is bursting! 💗💗" },
  { milestone: 175, text: "Blob discovered glitter magic! ✨" },
  { milestone: 200, text: "You’ve unlocked Blob Ultra! 🌟" },
  { milestone: 250, text: "Blob is now your best friend! 🫶" },
  { milestone: 300, text: "THE ULTIMATE PATTING CHAMPION! 👑✨🎉" },
];

// Initialize bg music volume & muted
bgMusic.volume = volumeSlider.value;
bgMusic.muted = true;

// Unmute and play on first user interaction (click or key)
function enableAudio() {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.volume = volumeSlider.value;
    bgMusic.play().catch(() => {
      /* ignore play errors */
    });
  }
  window.removeEventListener("click", enableAudio);
  window.removeEventListener("keydown", enableAudio);
}
window.addEventListener("click", enableAudio);
window.addEventListener("keydown", enableAudio);

// Volume slider changes bg music volume
volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;
  // if volume 0, mute the music, else unmute
  if (volumeSlider.value == 0) {
    bgMusic.muted = true;
  } else {
    bgMusic.muted = false;
  }
});

blob.addEventListener("click", petBlob);
blob.addEventListener("keydown", (e) => {
  if (["Enter", " ", "Spacebar"].includes(e.key)) {
    e.preventDefault();
    petBlob(e);
  }
});

resetBtn.addEventListener("click", () => {
  count = 0;
  localStorage.setItem("pats", count);
  updateDisplay();
  message.textContent = "Reset complete! Start petting again 💖";
  setTimeout(() => (message.textContent = ""), 4000);
});

function petBlob(e) {
  count++;
  localStorage.setItem("pats", count);
  updateDisplay();
  checkMilestone();

  blob.classList.add("happy");
  const sound = squishSounds[Math.floor(Math.random() * squishSounds.length)];
  sound.currentTime = 0;
  sound.play();

  const rect = blob.getBoundingClientRect();
  const x = e.clientX || rect.left + rect.width / 2;
  const y = e.clientY || rect.top + rect.height / 2;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.textContent = "✨";
  sparkle.style.left = `${x + 20}px`;
  sparkle.style.top = `${y}px`;

  document.body.appendChild(heart);
  document.body.appendChild(sparkle);

  setTimeout(() => {
    blob.classList.remove("happy");
    heart.remove();
    sparkle.remove();
  }, 1000);
}

function updateDisplay() {
  countText.textContent = `Pats: ${count}`;
  updateBlobEvolution();
}

function updateBlobEvolution() {
  if (count >= 300) accessory.textContent = "👑✨🎉";
  else if (count >= 250) accessory.textContent = "🫶";
  else if (count >= 200) accessory.textContent = "🌟";
  else if (count >= 175) accessory.textContent = "✨";
  else if (count >= 150) accessory.textContent = "💗💗";
  else if (count >= 125) accessory.textContent = "🪶";
  else if (count >= 100) accessory.textContent = "🎤";
  else if (count >= 75) accessory.textContent = "💃";
  else if (count >= 50) accessory.textContent = "🪽";
  else if (count >= 35) accessory.textContent = "👑";
  else if (count >= 20) accessory.textContent = "🐾";
  else if (count >= 10) accessory.textContent = "💞";
  else if (count >= 5) accessory.textContent = "🍬";
  else accessory.textContent = "🎀";
}

function checkMilestone() {
  const msg = messages.find((m) => m.milestone === count);
  if (msg) {
    message.textContent = msg.text;
    setTimeout(() => (message.textContent = ""), 4000);
  }
}
