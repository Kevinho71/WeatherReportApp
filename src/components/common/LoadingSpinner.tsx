import type { JSX } from "react";
import "../../styles/components/LoadingSpinner.css";

export const LoadingSpinner = (): JSX.Element => {
    return (
        <div className="loading-spinner">
            <div className="loading-spinner__spinner" />
            <p className="loading-spinner__text">
                Cargando...
            </p>
        </div>
    );
};
