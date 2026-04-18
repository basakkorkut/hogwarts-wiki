# ⚡ Hogwarts Wiki — Harry Potter Universe Explorer

A fully interactive Harry Potter Wiki built with **React** and **Tailwind CSS** . The application consumes two public APIs to present characters, books, spells, and an interactive Sorting Hat quiz in a clean, responsive, and immersive dark-themed interface.

**Live Demo:** [hogwarts-wiki.vercel.app](https://hogwarts-wiki.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Application Flow](#application-flow)
- [Pages & Components](#pages--components)
- [Special Features](#special-features)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

---

## Overview

Hogwarts Wiki is a Single Page Application (SPA) that allows users to explore the Harry Potter universe. Users can browse books, discover characters with detailed profiles, search through magical spells, and take an interactive Sorting Hat quiz to find out which Hogwarts house they belong to. All data is fetched dynamically from public APIs — no hard-coded mock data is used for the main content.

---

## Features

- **Home Page** — Hero section introducing the wizarding world with navigation cards to all sections and clickable Hogwarts house badges
- **Books Listing** — All 8 Harry Potter books displayed in a responsive grid with cover images, release dates, and page counts, with real-time search filtering by title
- **Book Detail** — Individual book pages showing cover art, release date, page count, and full description
- **Characters Listing** — 400+ characters from the wizarding world displayed in a paginated grid with house-colored borders, filterable by Hogwarts house (Gryffindor, Slytherin, Ravenclaw, Hufflepuff) and searchable by name
- **Character Detail** — Rich character profiles showing species, ancestry, wand details (wood, core, length), patronus, actor, date of birth, and status badges (Student, Staff, Wizard, Deceased), all themed to their Hogwarts house colors
- **Spells Listing** — 70+ spells searchable by name or description with Load More pagination
- **Sorting Hat Quiz** — An interactive 5-question personality quiz that determines the user's Hogwarts house, complete with a progress bar, animated result screen, and API-fetched famous house members
- **Golden Snitch Loading Animation** — A custom CSS-animated Golden Snitch with flapping wings replaces generic "Loading..." text across all pages
- **Fully Responsive Design** — Optimized for mobile, tablet, and desktop with a collapsible hamburger menu
- **Consistent Dark Theme** — Custom color palette inspired by the Harry Potter universe with gold accents

---

## Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library — function components with hooks (useState, useEffect, useParams, useNavigate, useSearchParams) |
| **Vite** | Build tool — fast dev server with HMR (Hot Module Replacement) and optimized production bundling |
| **Tailwind CSS v4** | Utility-first CSS framework — all styling done with Tailwind classes, no external CSS files |
| **React Router v7** | Client-side routing — SPA navigation without page reloads, dynamic routes with URL parameters |
| **Vanilla fetch()** | HTTP client — native browser API for all data fetching, no axios dependency |

---

## Project Structure

```
hogwarts-wiki/
├── index.html                  # Entry HTML — Vite injects JS bundle here
├── vite.config.js              # Vite configuration — React and Tailwind plugins
├── package.json                # Dependencies and scripts
│
└── src/
    ├── main.jsx                # App entry point — mounts React to #root div
    ├── App.jsx                 # Root component — React Router configuration
    ├── index.css               # Global styles — Tailwind imports, theme colors,
    │                           #   custom fonts, Golden Snitch keyframe animations,
    │                           #   and scrollbar styling
    │
    ├── services/
    │   └── api.js              # API service layer — ALL fetch calls centralized here
    │                           #   Exports: getAllBooks(), getAllCharacters(),
    │                           #   getCharacterById(), getCharactersByHouse(),
    │                           #   getAllSpells(), getHouses()
    │
    ├── components/
    │   ├── Navbar.jsx          # Top navigation bar — sticky, responsive, active page highlighting
    │   ├── Footer.jsx          # Footer — developer info, API credits, disclaimer
    │   ├── GoldenSnitch.jsx    # Loading animation — animated golden ball with flapping wings
    │   ├── SearchBar.jsx       # Reusable search input — controlled component pattern
    │   ├── BookCard.jsx        # Book card — cover image, title, date, page count
    │   ├── CharacterCard.jsx   # Character card — image, name, house-colored border
    │   └── SpellCard.jsx       # Spell card — spell name and description
    │
    └── pages/
        ├── Home.jsx            # Landing page — hero section, section cards, house badges
        ├── Books.jsx           # Book listing — search + responsive grid
        ├── BookDetail.jsx      # Single book view — full details with cover
        ├── Characters.jsx      # Character listing — search + house filter + Load More
        ├── CharacterDetail.jsx # Single character view — house-themed, wand, patronus
        ├── Spells.jsx          # Spell listing — search + Load More
        └── SortingHat.jsx      # Interactive quiz — 5 questions, scoring, API result
```

### Separation of Concerns

The project follows a clear separation of concerns:

- **`services/api.js`** handles all API communication. No component ever calls `fetch()` directly — they import and call named functions like `getAllBooks()` or `getCharacterById(id)`. This means if an API URL changes, only one file needs updating.

- **`components/`** contains reusable, presentational UI pieces. Each component has a single responsibility: `BookCard` renders one book card, `SearchBar` renders one search input. They receive data through props and don't manage API calls.

- **`pages/`** contains page-level components that orchestrate data fetching, state management, and composition of smaller components. Each page follows the same pattern: `useState` → `useEffect` → `fetch` → `render`.

---

## API Integration

This project consumes **two public APIs**. Neither requires authentication or API keys.

### API 1: HP-API

**Base URL:** `https://hp-api.onrender.com/api`
**GitHub:** [github.com/KostaSav/hp-api](https://github.com/KostaSav/hp-api)

| Endpoint | HTTP Method | Returns | Used In |
|---|---|---|---|
| `/characters` | GET | Array of 400+ characters with id, name, house, image, actor, wand, patronus, etc. | `Characters.jsx` |
| `/character/:id` | GET | Single character by UUID (returned as array with 1 element) | `CharacterDetail.jsx` |
| `/characters/house/:house` | GET | All characters belonging to a specific house (e.g., `/house/gryffindor`) | `SortingHat.jsx` |
| `/spells` | GET | Array of 70+ spells with id, name, description | `Spells.jsx` |

**Why HP-API?** It provides individual character lookup by ID (essential for detail pages), house-based filtering as a dedicated endpoint, and rich character data including wand details and patronus information.

### API 2: PotterAPI

**Base URL:** `https://potterapi-fedeperin.vercel.app/en`
**GitHub:** [github.com/fedeperin/potterapi](https://github.com/fedeperin/potterapi)

| Endpoint | HTTP Method | Returns | Used In |
|---|---|---|---|
| `/books` | GET | Array of 8 books with number, title, releaseDate, description, pages, cover image URL | `Books.jsx`, `BookDetail.jsx` |
| `/houses` | GET | Array of 4 Hogwarts houses with founder, colors, animal | Available for future use |

**Why PotterAPI?** HP-API does not have a books endpoint. PotterAPI provides detailed book information including cover images and descriptions, which are essential for the Books section.

### How API Calls Work in the Code

All API calls are centralized in `src/services/api.js`:

```
Page Component (e.g., Books.jsx)
  │
  │  useEffect(() => {
  │    getAllBooks()                          ← calls api.js function
  │      .then(data => setBooks(data))       ← success: store in state
  │      .catch(err => setError(err.message))← error: store error message
  │      .finally(() => setLoading(false))   ← always: stop loading spinner
  │  }, []);
  │
  ▼
api.js — getAllBooks()
  │
  │  const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books")
  │  if (!res.ok) throw new Error("Failed to fetch books")
  │  return res.json()
  │
  ▼
PotterAPI Server (Vercel)
  │
  └── Returns JSON: [{ number: 1, title: "...", cover: "...", ... }, ...]
```

Every page implements three states for API responses:
1. **Loading** → Golden Snitch animation is displayed
2. **Error** → Red error message with a description is shown
3. **Success** → Data is rendered in cards/grids

---

## Application Flow

### Routing Architecture

When the user opens the site, `main.jsx` renders `App.jsx`, which sets up React Router. The URL determines which page component is rendered:

```
URL in Browser              React Router renders         API Called
──────────────              ───────────────────          ──────────
/                           Home.jsx                     None (static)
/books                      Books.jsx                    PotterAPI /en/books
/books/3                    BookDetail.jsx               PotterAPI /en/books
/characters                 Characters.jsx               HP-API /api/characters
/characters/9e3f7ce4-...    CharacterDetail.jsx          HP-API /api/character/:id
/spells                     Spells.jsx                   HP-API /api/spells
/sorting-hat                SortingHat.jsx               HP-API /api/characters/house/:house
```

### Navigation Between Pages

```
HOME
  ├── Click "Books" card          → /books
  ├── Click "Characters" card     → /characters
  ├── Click "Spells" card         → /spells
  ├── Click "Sorting Hat" card    → /sorting-hat
  └── Click house badge           → /characters?house=Gryffindor (filtered)

BOOKS
  └── Click a book card           → /books/:index → BOOK DETAIL
        └── "Back to Books"       → /books

CHARACTERS
  └── Click a character card      → /characters/:id → CHARACTER DETAIL
        └── "Back to Characters"  → /characters

SORTING HAT (after quiz)
  ├── Click character avatar      → /characters/:id → CHARACTER DETAIL
  ├── "Try Again"                 → Quiz resets
  └── "View All"                  → /characters?house=Result (filtered)
```

### Data Filtering Pipeline (Characters Page)

The Characters page has the most complex data flow with three filtering stages:

```
API Response (400+ characters)
  │
  ├── Stage 1: HOUSE FILTER
  │   selectedHouse === "Gryffindor"
  │   → Only characters where char.house === "Gryffindor" pass (~30)
  │
  ├── Stage 2: NAME SEARCH
  │   searchTerm === "harry"
  │   → Only characters where char.name.includes("harry") pass
  │
  └── Stage 3: PAGINATION
      visibleCount = 12
      → filteredCharacters.slice(0, 12) → first 12 shown
      → "Load More" click → slice(0, 24) → 24 shown
```

---

## Pages & Components

### Pages

| Page | State Variables | API Function | Key Features |
|---|---|---|---|
| `Home.jsx` | None | None | Static hero section, 4 navigation cards, 4 house badges with query params |
| `Books.jsx` | books, loading, error, searchTerm | `getAllBooks()` | Real-time title search, responsive grid |
| `BookDetail.jsx` | book, loading, error | `getAllBooks()` + `.find()` | Dynamic route via `useParams()`, back navigation via `useNavigate()` |
| `Characters.jsx` | characters, loading, error, searchTerm, visibleCount | `getAllCharacters()` | House filter buttons, name search, Load More pagination, URL query params via `useSearchParams()` |
| `CharacterDetail.jsx` | character, loading, error | `getCharacterById()` | House-themed colors, wand info, patronus, status badges, dynamic info fields that hide when empty |
| `Spells.jsx` | spells, loading, error, searchTerm, visibleCount | `getAllSpells()` | Dual-field search (name + description), Load More pagination |
| `SortingHat.jsx` | currentQuestion, scores, result, houseCharacters, quizStarted | `getCharactersByHouse()` | 3-screen conditional rendering, progress bar, score calculation, post-quiz API call |

### Components

| Component | Props | Responsibility |
|---|---|---|
| `Navbar` | None (uses `useLocation`) | Sticky top navigation, mobile hamburger menu, active page highlighting |
| `Footer` | None | Developer credits, API attribution, legal disclaimer |
| `GoldenSnitch` | None | Animated loading indicator with CSS keyframe animations |
| `SearchBar` | `value`, `onChange`, `placeholder` | Controlled input component, reused across 3 pages |
| `BookCard` | `book` | Displays book cover, title, date, pages; links to detail page |
| `CharacterCard` | `character` | Displays character image, name, actor; house-colored borders |
| `SpellCard` | `spell` | Displays spell name and description |

---

## Special Features

### Golden Snitch Loading Animation

Instead of a plain "Loading..." text, the application displays an animated Golden Snitch while waiting for API responses. The animation is built entirely with CSS — no external animation libraries are used.

**How it works:**

Three `@keyframes` animations are defined in `index.css`:

- **`snitch-fly`** — Moves the golden ball in an irregular flying pattern across 4 waypoints using `translate()` and `rotate()`, creating a realistic flying motion over a 3-second loop
- **`snitch-wing`** — Flaps the wings by combining `rotateY()` (3D rotation toward/away from viewer) and `scaleX()` (horizontal compression) at 0.4-second intervals
- The right wing uses the `reverse` direction so wings flap in opposition

The `GoldenSnitch.jsx` component applies these animations via inline `style={{ animation: "snitch-fly 3s ease-in-out infinite" }}` to the ball, and each wing div receives the wing-flap animation. The ball itself is a `div` with a radial gradient (`from-yellow-300 via-amber-400 to-yellow-600`) and a gold glow shadow.

Every page that fetches data uses the pattern:
```jsx
if (loading) return <GoldenSnitch />;
```

### Sorting Hat Quiz

The Sorting Hat is an interactive personality quiz with 3 distinct screens managed through conditional rendering:

**Screen 1 — Start:** A welcome message with the Sorting Hat's famous quote and a "Begin Sorting Ceremony" button.

**Screen 2 — Questions:** 5 questions are presented one at a time with a progress bar. Each question has 4 options, and each option is mapped to a Hogwarts house. When clicked, `handleAnswer(house)` increments that house's score in the `scores` state object using the spread operator:
```js
const newScores = { ...scores, [house]: scores[house] + 1 };
```

After the final question, the winner is determined by:
```js
const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
```

**Screen 3 — Result:** The winning house is displayed with its emoji, colors, and description. A `useEffect` hook watches the `result` state — when it changes from `null` to a house name, it calls `getCharactersByHouse()` from the API and displays 6 famous members of that house as clickable avatars (linking to their detail pages). Users can retake the quiz or navigate to see all characters of their house.

### Dynamic House Theming

Character detail pages dynamically change their color scheme based on the character's Hogwarts house. A `houseThemes` object maps each house to specific gradient backgrounds, badge colors, and border colors. When a character belongs to Gryffindor, the page uses crimson and gold tones; Slytherin characters get green and silver, and so on.

### Cross-Page Query Parameters

The Home page's house badges link to `/characters?house=Gryffindor`. The Characters page reads this query parameter using React Router's `useSearchParams()` hook and automatically applies the house filter on mount. The Sorting Hat's "View All Characters" button uses the same mechanism. This creates a seamless navigation experience where clicking a house anywhere in the app leads to a pre-filtered character list.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)


## Acknowledgments

- [HP-API](https://hp-api.onrender.com/) by KostaSav — Character and spell data
- [PotterAPI](https://github.com/fedeperin/potterapi) by fedeperin — Book and house data
- This project is not affiliated with J.K. Rowling or Warner Bros.