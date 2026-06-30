import { Features } from "./features";
import { SearchIndexItem } from "../../types";

export const scoreModel = (f: Features, item: SearchIndexItem) => {
  let score = 0;

  // ⭐ exact cực mạnh
  score += f.exact * 30000;

  // ⭐ prefix quan trọng nhất cho "H"
  score += f.prefix * 20000;

  // token match
  score += f.tokenOverlap * 12000;

  // fuzzy giảm vai trò
  score += f.fuzzy * 2000;

  // intent
  score += f.intent * 5000;

  // boost
  score += f.boost;

  // type priority
  if (item.type === "airport") score += 4000;
  if (item.type === "city") score -= 1500;

  return score;
};
