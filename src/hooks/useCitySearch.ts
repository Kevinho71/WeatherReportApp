import { useState, useEffect } from "react";
import { getCoordinatesByCityName } from "../services/geocodingApi";
import type { Result } from "../types/mapped/geocodingMapped.type";

export const useCitySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cities, setCities] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setCities([]);
            return;
        }

        const delaySearch = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                const geocodingData = await getCoordinatesByCityName(searchTerm);
                
                if (geocodingData.result.length === 0) {
                    setError("No se encontraron ciudades con ese nombre");
                }
                
                setCities(geocodingData.result);
            } catch {
                setError("Error al buscar ciudades");
                setCities([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        cities,
        loading,
        error
    };
};