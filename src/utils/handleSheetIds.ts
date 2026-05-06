const STORAGE_KEY = "catan-sheet-ids";

const getStoredIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveId = (id: string) => {
  const current = getStoredIds();
  const updated = [id, ...current.filter((x) => x !== id)].slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const removeId = (id: string) => {
  const updated = getStoredIds().filter((x) => x !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export { getStoredIds, removeId, saveId };
