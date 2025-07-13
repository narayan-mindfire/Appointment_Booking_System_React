/**
 * Get data from localStorage.
 */
function loadData<T>(key:string, defaultValue:T) :T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

/**
 * Saves data to localStorage.
 */
function saveData<T>(key:string, data:T) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Removes data from localStorage.
 */
function removeData(key: string): void {
  localStorage.removeItem(key);
}

export {
    loadData,
    saveData,
    removeData
}

