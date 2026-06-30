import React from "react";

export const highlightMatch = (
  text: string,
  query?: string | { name?: string },
) => {
  if (!query) return text;

  const searchText = typeof query === "string" ? query : (query?.name ?? "");

  const normalizedQuery = searchText.trim();

  if (!normalizedQuery) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = normalizedQuery.toLowerCase();

  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);

  const match = text.slice(index, index + normalizedQuery.length);

  const after = text.slice(index + normalizedQuery.length);

  return (
    <>
      {before}

      <span className="text-blue-500 font-medium">{match}</span>

      {after}
    </>
  );
};
