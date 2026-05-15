const STORAGE_KEY = "edumeup_scholarship";

export type StoredScholarship = {
  code: string;
  country: string;
  concessionPercent: number;
  region: "africa" | "asia" | "americas";
  email: string;
  expiresAt: string;
};

export function saveScholarshipToStorage(data: StoredScholarship) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadScholarshipFromStorage(): StoredScholarship | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredScholarship;
    if (new Date(parsed.expiresAt).getTime() < Date.now()) {
      clearScholarshipStorage();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearScholarshipStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
