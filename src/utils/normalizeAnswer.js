// Answer normalization and matching. No UI code in here.

// Lowercase, strip accents, "&" -> "and", collapse whitespace, trim.
export function normalizeAnswer(input) {
  if (typeof input !== "string") return "";
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\s+/g, " ")
    .trim();
}

// Comparison key: keeps only a-z, 0-9, "+" and "#".
// "Node.js", "node js" and "NodeJS" all become "nodejs",
// while "C", "C++" and "C#" stay different.
export function toMatchKey(input) {
  return normalizeAnswer(input).replace(/[^a-z0-9+#]/g, "");
}

export function isEmptyAnswer(input) {
  return toMatchKey(input) === "";
}

export function getAcceptedKeys(logo) {
  const keys = new Set();
  [logo.name, ...(logo.aliases || [])].forEach((candidate) => {
    const key = toMatchKey(candidate);
    if (key) keys.add(key);
  });
  return keys;
}

// True only if the whole answer equals the name or one alias (after normalization).
export function isAnswerCorrect(input, logo) {
  const key = toMatchKey(input);
  if (!key || !logo) return false;
  return getAcceptedKeys(logo).has(key);
}