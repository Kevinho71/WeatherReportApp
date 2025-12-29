import type { JSX } from "react";
import "../../styles/components/ErrorMessage.css";

interface Props {
    message: string;
}

export const ErrorMessage = ({ message }: Props): JSX.Element => {
    return (
        <div className="error-message">
            <div style={{
                fontSize: "56px",
                marginBottom: "15px",
                filter: "drop-shadow(0 0 20px rgba(220,20,60,0.5))"
            }}>
                ⚠️
            </div>
            <h3 className="error-message__title">
                Oops! Algo salió mal
            </h3>
            <p className="error-message__text">
                {message}
            </p>
        </div>
    );
};
