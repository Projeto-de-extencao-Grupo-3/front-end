import "./Loading.css";
import { useState, useEffect } from "react";

function Loading({ isLoading, children, message = "Carregando..." }) {
    const [displayLoading, setDisplayLoading] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setDisplayLoading(true);
            }, 0)
        } else {
            setTimeout(() => {
                setDisplayLoading(false);
            }, 0)
        }
    }, [isLoading]);

    if (!displayLoading) {
        return children;
    }

    return (
        <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-message">{message}</p>
        </div>
    );
}

export default Loading;
