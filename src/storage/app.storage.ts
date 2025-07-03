import stateService from "../services/app.state";

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
 * loads data from localStorage
 */
function loadFromStorage() {
    stateService.setState("appointments", loadData("appointments", []))
    stateService.setState("isGridSelected", loadData("isGridSelected", true))
    stateService.setState("editingAppointmentId", loadData("editingAppointmentId", null))
}


export {
    loadFromStorage,
    loadData,
    saveData
}

