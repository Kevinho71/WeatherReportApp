import { useState, useEffect } from "react";
import { getCoordinatesByCityName } from "../services/geocodingApi";
import type { Result } from "../types/mapped/geocodingMapped.type";
import axios from "axios";

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

                if (!navigator.onLine) {
                    throw new Error("OFFLINE");
                }
                
                if (geocodingData.result.length === 0) {
                    setError("No se encontraron ciudades con ese nombre");
                }
                
                setCities(geocodingData.result);
            } catch (err: unknown){
                setCities([]);

                // 2. Primero verificamos si es nuestro error manual
                if (err instanceof Error && err.message === "OFFLINE") {
                    setError("Sin conexión a internet");
                    return;
                }

                // 3. Verificamos si es un error de Axios (Type Guard)
                if (axios.isAxiosError(err)) {
                    // Aquí TS ya sabe que 'err' tiene propiedades de Axios
                    if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
                        setError("Error de conexión. Verifica tu red.");
                    } else {
                        // Error del servidor (500, 404, etc.)
                        setError("Error al buscar ciudades. Intenta más tarde.");
                    }
                } 
                // 4. Cualquier otro tipo de error inesperado
                else {
                    setError("Ocurrió un error desconocido");
                }
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