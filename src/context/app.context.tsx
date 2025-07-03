import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type JSX,
} from "react";
import { loadData, saveData } from "../storage/app.storage";
import type { State } from "../types";

const defaultState: State = {
  appointments: loadData("appointments", []),
  isGridSelected: loadData("isGridSelected", true),
  editingAppointmentId: loadData("editingAppointmentId", null),
  sortAppointmentsBy: null,
};

interface AppContextType {
  state: State;
  setState: <K extends keyof State>(key: K, value: State[K]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, setInternalState] = useState<State>(defaultState);

  const setState = <K extends keyof State>(key: K, value: State[K]) => {
    setInternalState((prev) => {
      const updated = { ...prev, [key]: value };
      saveData(key, value);
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
