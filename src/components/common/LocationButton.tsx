import type { JSX } from "react";
import "../../styles/components/LocationButton.css";

interface Props {
    onClick: () => void;
    loading: boolean;
}

export const LocationButton = ({ onClick, loading }: Props): JSX.Element => {
    return (
        <button 
            onClick={onClick} 
            disabled={loading}
            className="location-button"
        >
            <span className="location-button__icon">
                {loading ? "⏳" : "📍"}
            </span>
            <span className="location-button__text">
                {loading ? "Obteniendo ubicación..." : "Ver clima en mi ubicación"}
            </span>
        </button>
    );
};
