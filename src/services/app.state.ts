import { saveData } from "../storage/app.storage";
import type { State } from "../types";

type StateKey = keyof State;
type StateValue<K extends StateKey> = State[K];
type Observer = () => void;

const stateService = (function () {
    const state : State = {
        editingAppointmentId: null,
        sortAppointmentsBy: null,
        isGridSelected: true,
        appointments: []
    };

    // observers map, each key maps to array of callbacks
    const observers: { [K in StateKey]?: Observer[] } = {};

    // notify all observers when a key changes
    function notifyObservers<K extends StateKey>(key: K): void {
        observers[key]?.forEach((callback) => callback());
    }

    //setting state, triggers observers
    function setState<K extends StateKey>(key: K, value: StateValue<K>): void {
        if (state[key] === value) return;
        state[key] = value;
        saveData(key, value);
        notifyObservers(key);
    }

    // returns current state value
    function getState<K extends StateKey>(key: K): StateValue<K> {
        return state[key];
    }

    // state values mapped to functions to be triggered on change
    function subscribe<K extends StateKey>(key: K, callback: Observer): void {
        if (!observers[key]) {
            observers[key] = [];
        }
        observers[key].push(callback);
    }

    return {
        setState,
        getState,
        subscribe
    };
})();

export default stateService;
