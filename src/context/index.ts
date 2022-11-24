import { createContext } from 'react';

export interface globalValueType {
  loading?: boolean;
}

export interface globalContextType extends globalValueType {
  setGlobalContext: (data: globalValueType) => void;
}

export const GlobalContext = createContext<globalContextType | null>(null);
