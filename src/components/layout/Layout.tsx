import type { JSX, ReactNode } from "react";
import "../../styles/layout.css";

interface Props {
    children: ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => {
    return (
        <div className="layout">
            <div className="layout__container">
                <header className="layout__header">
                    <h1 className="layout__title">
                        ⛅ Weather Report
                    </h1>
                    <p className="layout__subtitle">
                        Pronóstico del clima en tiempo real
                    </p>
                </header>
                <main className="layout__main">
                    {children}
                </main>
            </div>
        </div>
    );
};
