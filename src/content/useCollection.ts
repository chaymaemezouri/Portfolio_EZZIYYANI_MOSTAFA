import { useEffect, useState } from "react";

const cache = new Map<string, unknown[]>();

async function loadCollection<T>(name: string): Promise<T[] | null> {
  const urls = [`/api/content/${name}`, `/cms/${name}.json`];
  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      const type = response.headers.get("content-type") ?? "";
      if (!response.ok || !type.includes("application/json")) continue;
      const data = (await response.json()) as T[];
      if (Array.isArray(data)) return data;
    } catch {
      /* try next source */
    }
  }
  return null;
}

export function useCollection<T>(name: string, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(() => (cache.get(name) as T[] | undefined) ?? fallback);

  useEffect(() => {
    let alive = true;
    loadCollection<T>(name).then((data) => {
      if (!alive || !data) return;
      if (data.length === 0 && fallback.length > 0) return;
      cache.set(name, data);
      setItems(data);
    });
    return () => {
      alive = false;
    };
  }, [name]);

  return items;
}
