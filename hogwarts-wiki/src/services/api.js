// Base URLs — all endpoints are appended to these
// HP-API: Characters and Spells
// PotterAPI: Books and Houses
//Both APIs are free and public, no authentication needed,I take from Github repos
const HP_API_BASE = "https://hp-api.onrender.com/api";
const POTTER_API_BASE = "https://potterapi-fedeperin.vercel.app/en";




/**
 * Fetches all characters
 * Endpoint: GET /api/characters
 * Returns: [{id, name, house, image, actor, ...}, ...]
 * Used in: Characters.jsx
 */
export async function getAllCharacters() {
  const res = await fetch(`${HP_API_BASE}/characters`);
  // res.ok: true if HTTP status is between 200-299
  if (!res.ok) throw new Error("Failed to fetch characters");
  // res.json(): Converts the response body from JSON to a JS object
  return res.json();
}

/**
 * Fetches a specific character by ID
 * Endpoint: GET /api/character/:id
 * Parameter: id — the character's unique UUID
 * Returns: [{id, name, house, wand, patronus, ...}] (single-element array)
 * Used in: CharacterDetail.jsx
 */
export async function getCharacterById(id) {
  const res = await fetch(`${HP_API_BASE}/character/${id}`);
  if (!res.ok) throw new Error("Failed to fetch character");
  return res.json();
}

/**
 * Fetches characters from a specific house
 * Endpoint: GET /api/characters/house/:house
 * Parameter: house — house name (lowercase: "gryffindor", "slytherin", etc.)
 * Returns: [{id, name, house, ...}, ...] (all characters in that house)
 * Used in: SortingHat.jsx (on the result screen)
 */
export async function getCharactersByHouse(house) {
  const res = await fetch(`${HP_API_BASE}/characters/house/${house}`);
  if (!res.ok) throw new Error(`Failed to fetch ${house} characters`);
  return res.json();
}

/**
 * Fetches all spells
 * Endpoint: GET /api/spells
 * Returns: [{id, name, description}, ...]
 * Used in: Spells.jsx
 */
export async function getAllSpells() {
  const res = await fetch(`${HP_API_BASE}/spells`);
  if (!res.ok) throw new Error("Failed to fetch spells");
  return res.json();
}




/**
 * Fetches all books
 * Endpoint: GET /en/books
 * Returns: [{number, title, releaseDate, description, pages, cover, index}, ...]
 * Used in: Books.jsx, BookDetail.jsx
 */
export async function getAllBooks() {
  const res = await fetch(`${POTTER_API_BASE}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

/**
 * Fetches Hogwarts houses
 * Endpoint: GET /en/houses
 * Returns: [{house, emoji, founder, colors, animal, index}, ...]
 * Used in: Not directly used at the moment, but ready for extension
 */
export async function getHouses() {
  const res = await fetch(`${POTTER_API_BASE}/houses`);
  if (!res.ok) throw new Error("Failed to fetch houses");
  return res.json();
}
