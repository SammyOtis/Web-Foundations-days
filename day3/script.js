// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
// Returns array of notes whose text contains word (case-insensitive)
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
// Returns the note object with the most characters, or null if empty
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) =>
    current.text.length > longest.text.length ? current : longest
  );
}

// 3. countByCategory()
// Returns an object counting notes per category
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary()
// Returns a summary string using countByCategory and correct singular/plural forms
function getSummary() {
  const total = notes.length;
  const label = total === 1 ? "note" : "notes";
  const counts = countByCategory();

  const parts = Object.entries(counts).map(
    ([category, count]) => `${count} ${category}`
  );

  return `${total} ${label}: ${parts.join(", ")}.`;
}

// 5. isDuplicate(text)
// Returns true if a note with the same text exists (ignores case & extra spaces)
function isDuplicate(text) {
  const cleanInput = text.trim().toLowerCase();
  return notes.some(
    (note) => note.text.trim().toLowerCase() === cleanInput
  );
}

// 6. addNote(text, category)
// Adds a note if valid length (1-200), not duplicate, and allowed category
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmedText = text.trim();

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Failed to add note: Text length must be between 1 and 200 characters.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log(`Failed to add note: Invalid category "${category}".`);
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log(`Failed to add note: Duplicate note text "${trimmedText}".`);
    return false;
  }

  const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: newId, text: trimmedText, category });
  return true;
}

// TEST CASES & CONSOLE LOGS

console.log("--- 1. Testing searchNotes ---");
console.log(searchNotes("javascript")); 
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]
console.log(searchNotes("python")); 
// Expected: []

console.log("\n--- 2. Testing longestNote ---");
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
const tempNotes = notes;
notes = [];
console.log(longestNote()); 
// Expected: null
notes = tempNotes; // restore notes

console.log("\n--- 3. Testing countByCategory ---");
console.log(countByCategory()); 
// Expected: { personal: 2, study: 2, work: 1 }

console.log("\n--- 4. Testing getSummary ---");
console.log(getSummary()); 
// Expected: "5 notes: personal 2, study 2, work 1." (or formatted list of categories)

console.log("\n--- 5. Testing isDuplicate ---");
console.log(isDuplicate("  buy milk and bread  ")); 
// Expected: true
console.log(isDuplicate("Buy fresh milk")); 
// Expected: false

console.log("\n--- 6. Testing addNote ---");
console.log(addNote("Submit Day 3 assignment", "study")); 
// Expected: true
console.log(addNote("Call mum", "personal")); 
// Expected: Failed to add note: Duplicate note text "Call mum". -> false
console.log(addNote("Invalid Category Note", "gym")); 
// Expected: Failed to add note: Invalid category "gym". -> false
console.log(addNote("", "work")); 
// Expected: Failed to add note: Text length must be between 1 and 200 characters. -> false