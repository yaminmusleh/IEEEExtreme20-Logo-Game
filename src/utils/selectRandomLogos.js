// Random, unique, difficulty-balanced logo selection. Independent of the UI.

// Unbiased Fisher-Yates shuffle (returns a new array).
export function shuffle(items, rng = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getBand(difficulty) {
  if (difficulty <= 2) return "easy";
  if (difficulty === 3) return "medium";
  return "hard";
}

// Make the easy/medium/hard targets add up to the number of logos we can pick.
function resolveTargets(rules, total) {
  let easy = Math.max(0, rules.easyCount);
  let medium = Math.max(0, rules.mediumCount);
  let hard = Math.max(0, rules.hardCount);

  if (easy + medium + hard !== total) {
    console.warn(
      `[gameConfig] easy + medium + hard (${easy + medium + hard}) does not equal the number of rounds (${total}). Adjusting automatically.`
    );
    easy = Math.min(easy, total);
    medium = Math.min(medium, total - easy);
    hard = total - easy - medium;
  }
  return { easy, medium, hard };
}

/**
 * @param {Array} database  logo entries
 * @param {Object} rules    gameConfig.rules
 * @param {Function} rng    random function returning [0,1) (injectable for tests)
 * @returns {Array} unique logo entries, difficulty-mixed and shuffled
 */
export function selectRandomLogos(database, rules, rng = Math.random) {
  // De-duplicate by id defensively.
  const seen = new Set();
  const pool = database.filter((logo) => {
    if (!logo || seen.has(logo.id)) return false;
    seen.add(logo.id);
    return true;
  });

  const total = Math.min(rules.totalRounds, pool.length);
  const targets = resolveTargets(rules, total);
  const mix = rules.randomSelection
    ? (items) => shuffle(items, rng)
    : (items) => [...items];

  const groups = { easy: [], medium: [], hard: [] };
  pool.forEach((logo) => groups[getBand(logo.difficulty)].push(logo));

  const picked = [
    ...mix(groups.easy).slice(0, targets.easy),
    ...mix(groups.medium).slice(0, targets.medium),
    ...mix(groups.hard).slice(0, targets.hard),
  ];

  // Shortage in a band: fill from unused entries of any band (never duplicates).
  if (picked.length < total) {
    const usedIds = new Set(picked.map((logo) => logo.id));
    const leftovers = mix(pool.filter((logo) => !usedIds.has(logo.id)));
    picked.push(...leftovers.slice(0, total - picked.length));
  }

  // Mix difficulty levels throughout the session.
  return mix(picked);
}