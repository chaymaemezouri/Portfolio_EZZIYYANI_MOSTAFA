import { useEffect, useState } from "react";

const cache = new Map<string, unknown[]>();

export function useCollection<T>(name: string, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(() => (cache.get(name) as T[] | undefined) ?? fallback);

  useEffect(() => {
    let alive = true;
    fetch(`/api/content/${name}`)
      .then((response) => {
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
          throw new Error("unavailable");
        }
        return response.json() as Promise<T[]>;
      })
      .then((data) => {
        if (!Array.isArray(data) || (data.length === 0 && fallback.length > 0)) return;
        cache.set(name, data);
        if (alive) setItems(data);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [name]);

  return items;
}
