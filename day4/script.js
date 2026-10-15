// DOM Element Selectors
const noteTextarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// Update character and word counters, and toggle warning/over classes
function updateCounts() {
  const text = noteTextarea.value;
  const length = text.length;

  // Character Count Update
  charCount.textContent = `${length} / 200 characters`;

  // Warning Classes Reset & Application
  charCount.classList.remove("warning", "over");
  if (length > 200) {
    charCount.classList.add("over");
  } else if (length > 180) {
    charCount.classList.add("warning");
  }

  // Word Count Calculation
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  wordCount.textContent = `${words} words`;
}

// Clear draft and reset counters
function clearDraft() {
  noteTextarea.value = "";
  localStorage.removeItem("quicknotes_draft");
  updateCounts();
}

// Toggle light/dark theme and store preference
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem("quicknotes_theme", isDark ? "dark" : "light");
}

// Restore saved state from localStorage on load
function restoreState() {
  // Restore Draft
  const savedDraft = localStorage.getItem("quicknotes_draft");
  if (savedDraft !== null) {
    noteTextarea.value = savedDraft;
  }

  // Restore Theme
  const savedTheme = localStorage.getItem("quicknotes_theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    themeToggle.textContent = "Dark mode";
  }

  updateCounts();
}

// Event Listeners
noteTextarea.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem("quicknotes_draft", noteTextarea.value);
});

clearBtn.addEventListener("click", clearDraft);

themeToggle.addEventListener("click", toggleTheme);

noteTextarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearDraft();
  }
});

// Initialize state on script load
restoreState();