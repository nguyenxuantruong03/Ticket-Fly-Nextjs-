import { useEffect } from "react";
import { GroupedSearchResult } from "../../types";

interface Props {
  results: GroupedSearchResult[];

  activeIndex: number;

  setActiveIndex: (value: number) => void;

  onSelect: (item: GroupedSearchResult) => void;
}

export function useKeyboard({
  results,

  activeIndex,

  setActiveIndex,

  onSelect,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActiveIndex(
          Math.min(
            activeIndex + 1,

            results.length - 1,
          ),
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveIndex(
          Math.max(
            activeIndex - 1,

            0,
          ),
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();

        const current = results[activeIndex];

        if (current) {
          onSelect(current);
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [results, activeIndex, setActiveIndex, onSelect]);
}
