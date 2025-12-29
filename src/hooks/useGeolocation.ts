import { useState } from "react";
import { getCityNameByCoordinates } from "../services/geocodingApi";
import type { Result } from "../types/mapped/geocodingMapped.type";

interface GeolocationState {
    loading: boolean;
    error: string | null;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        loading: false,
        error: null
    });

    const getCurrentLocation = async (): Promise<Result | null> => {
        // Verificar si el navegador soporta geolocalización
        if (!navigator.geolocation) {
            setState({
                loading: false,
                error: "Tu navegador no soporta geolocalización"
            });
            return null;
        }

        setState({ loading: true, error: null });

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        
                        // Obtener el nombre de la ciudad usando reverse geocoding
                        const locationData = await getCityNameByCoordinates(latitude, longitude);
                        
                        const result: Result = {
                            city: locationData.city,
                            country: locationData.country,
                            detail: "", // No hay admin1 en este caso
                            latitude: locationData.latitude,
                            longitude: locationData.longitude
                        };

                        setState({ loading: false, error: null });
                        resolve(result);
                    } catch {
                        setState({
                            loading: false,
                            error: "Error al obtener la ubicación"
                        });
                        resolve(null);
                    }
                },
                (error) => {
                    let errorMessage = "Error al obtener tu ubicación";
                    
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Permiso de ubicación denegado";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Ubicación no disponible";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Tiempo de espera agotado";
                            break;
                    }

                    setState({ loading: false, error: errorMessage });
                    resolve(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    };

    return {
        loading: state.loading,
        error: state.error,
        getCurrentLocation
    };
};
