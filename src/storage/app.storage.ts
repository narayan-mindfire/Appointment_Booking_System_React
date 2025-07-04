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


export {
    loadData,
    saveData
}

