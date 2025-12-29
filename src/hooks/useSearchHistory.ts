import { useState } from "react";
import type { Result } from "../types/mapped/geocodingMapped.type";

const STORAGE_KEY = "weather_search_history";
const MAX_HISTORY_ITEMS = 5;

export const useSearchHistory = () => {
    // Inicializar con datos del localStorage
    const [history, setHistory] = useState<Result[]>(() => {
        const savedHistory = localStorage.getItem(STORAGE_KEY);
        if (savedHistory) {
            try {
                return JSON.parse(savedHistory);
            } catch (error) {
                console.error("Error parsing search history:", error);
                return [];
            }
        }
        return [];
    });

    const addToHistory = (city: Result) => {
        setHistory((prevHistory) => {
            // Verificar si la ciudad ya está en el historial
            const exists = prevHistory.some(
                (item) =>
                    item.latitude === city.latitude &&
                    item.longitude === city.longitude
            );

            let newHistory: Result[];
            
            if (exists) {
                // Si existe, moverla al principio
                newHistory = [
                    city,
                    ...prevHistory.filter(
                        (item) =>
                            item.latitude !== city.latitude ||
                            item.longitude !== city.longitude
                    )
                ];
            } else {
                // Si no existe, agregarla al principio
                newHistory = [city, ...prevHistory];
            }

            // Limitar a MAX_HISTORY_ITEMS
            newHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);

            // Guardar en localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

            return newHistory;
        });
    };

    const removeFromHistory = (latitude: number, longitude: number) => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.filter(
                (item) =>
                    item.latitude !== latitude || item.longitude !== longitude
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        history,
        addToHistory,
        removeFromHistory,
        clearHistory
    };
};
