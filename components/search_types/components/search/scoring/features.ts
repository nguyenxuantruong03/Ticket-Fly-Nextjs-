import { SearchIndexItem } from "../../types";
import { normalize, tokenize } from "../utils/text";
import { similarity } from "../utils/fuzzy";
import { Intent } from "../intent/detectIntent";

export type Features = {
  exact: number;
  prefix: number;
  tokenOverlap: number;
  fuzzy: number;
  boost: number;
  intent: number;
};

export const buildFeatures = (
  item: SearchIndexItem,
  qRaw: string,
  qTokens: string[],
  intent: Intent,
): Features => {
  const text = normalize([item.name, ...(item.aliases ?? [])].join(" "));
  const tokens = tokenize(text);

  const isShortQuery = qRaw.length <= 2; // ⭐ FIX

  /**
   * EXACT
   */
  const exact = text === qRaw ? 1 : 0;

  /**
   * PREFIX
   */
  const prefix = text.startsWith(qRaw) ? 1 : 0;

  /**
   * TOKEN MATCH
   */
  let matched = 0;
  for (const q of qTokens) {
    if (tokens.includes(q)) matched++;
  }

  const tokenOverlap = qTokens.length ? matched / qTokens.length : 0;

  /**
   * FUZZY
   */
  let fuzzyTotal = 0;

  for (const q of qTokens) {
    let best = 0;

    for (const t of tokens) {
      const s = similarity(q, t);
      if (s > best) best = s;
    }

    fuzzyTotal += best;
  }

  let fuzzy = qTokens.length ? fuzzyTotal / qTokens.length : 0;

  /**
   * ⭐ SHORT QUERY: disable fuzzy hoàn toàn
   */
  if (isShortQuery) {
    fuzzy = 0;
  } else if (fuzzy < 0.75) {
    fuzzy = 0;
  }

  /**
   * INTENT
   */
  const intentScore =
    intent === "airport" && item.type === "airport"
      ? 1
      : intent === "hotel" && item.type === "hotel"
        ? 1
        : intent === "city" && item.type === "city"
          ? 1
          : 0;

  return {
    exact,
    prefix,
    tokenOverlap,
    fuzzy,
    boost: item.scoreBoost ?? 0,
    intent: intentScore,
  };
};
