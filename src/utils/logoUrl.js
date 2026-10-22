import { gameConfig } from "../config/gameConfig.js";

export function getLogoUrl(slug) {
  const { source, simpleIconsVersion, localExtension } = gameConfig.logos;

  switch (source) {
    case "local":
      return `/logos/${slug}.${localExtension}`;
    case "simpleicons-color":
      return `https://cdn.simpleicons.org/${slug}`;
    case "jsdelivr":
    default:
      return `https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
  }
}