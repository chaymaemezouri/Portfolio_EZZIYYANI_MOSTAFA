import type { Item, ItemData } from "@/content/collections";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details: string[] = [],
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    credentials: "same-origin",
    ...init,
    headers: init.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...init.headers },
  });
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    throw new ApiError("API indisponible", response.status || 503);
  }
  const body = (await response.json().catch(() => ({}))) as { error?: string; details?: string[]; email?: string };
  if (!response.ok) throw new ApiError(body.error ?? `Erreur ${response.status}`, response.status, body.details);
  return body as T;
}

export type AuditEntry = {
  id: number;
  at: string;
  action: string;
  collection: string;
  itemId: string;
  title: string;
  canRestore: boolean;
};

export const api = {
  me: () =>
    request<{ email: string }>("/auth/me").then((me) => {
      if (!me.email) throw new ApiError("Non connecté", 401);
      return me;
    }),
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  list: (collection: string) => request<Item[]>(`/admin/${collection}`),
  get: (collection: string, id: string) => request<Item>(`/admin/${collection}/${id}`),
  create: (collection: string, data: ItemData, published: boolean) =>
    request<Item>(`/admin/${collection}`, { method: "POST", body: JSON.stringify({ data, published }) }),
  update: (collection: string, id: string, data: ItemData, published: boolean) =>
    request<Item>(`/admin/${collection}/${id}`, { method: "PUT", body: JSON.stringify({ data, published }) }),
  remove: (collection: string, id: string) => request(`/admin/${collection}/${id}`, { method: "DELETE" }),
  reorder: (collection: string, ids: string[]) =>
    request(`/admin/${collection}/reorder`, { method: "POST", body: JSON.stringify({ ids }) }),
  audit: () => request<AuditEntry[]>("/admin/audit"),
  restore: (id: number) => request(`/admin/audit/${id}/restore`, { method: "POST" }),
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<{ url: string }>("/admin/upload", { method: "POST", body: form });
  },
};
