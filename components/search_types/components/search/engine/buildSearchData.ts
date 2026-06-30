import { SearchIndexItem, ScoredItem } from "../../types";
import { normalize, tokenize } from "../utils/text";
import { detectIntent } from "../intent/detectIntent";
import { buildFeatures } from "../scoring/features";
import { scoreModel } from "../scoring/scoreModel";

export const buildSearchData = (
  index: SearchIndexItem[],
  keyword: string,
): ScoredItem[] => {
  const qRaw = normalize(keyword);

  if (!qRaw) return [];

  const qTokens = tokenize(qRaw);
  const intent = detectIntent(keyword);

  const isShortQuery = qRaw.length <= 2; // ⭐ KEY FIX

  return index
    .map((item) => {
      const features = buildFeatures(item, qRaw, qTokens, intent);

      const score = scoreModel(features, item);

      return {
        id: item.id,
        type: item.type,
        item,
        score,
        features,
      };
    })

    .filter((x) => {
      const f = x.features;

      /**
       * 🟢 SHORT QUERY MODE (H, Ho, HN...)
       * → ưu tiên prefix, KHÔNG filter quá gắt
       */
      if (isShortQuery) {
        return f.prefix === 1 || f.tokenOverlap > 0 || f.intent === 1;
      }

      /**
       * 🔵 NORMAL QUERY MODE
       */
      const hasExact = f.exact === 1;
      const hasTokenMatch = f.tokenOverlap > 0;
      const hasGoodFuzzy = f.fuzzy >= 0.75;

      return x.score > 1200 && (hasExact || hasTokenMatch || hasGoodFuzzy);
    })

    .sort((a, b) => b.score - a.score)
    .slice(0, 50);
};
