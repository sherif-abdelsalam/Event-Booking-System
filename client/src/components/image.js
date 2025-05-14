import { useState } from "react";

const Image = ({ src, alt = "Image", Class }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <>
            {loading && (
                <div className={`bg-gray-200 animate-pulse ${Class}`}></div>
            )}
            {error ? (
                <div className={`bg-gray-100 flex items-center justify-center ${Class}`}>
                    <span className="text-gray-400">Image not available</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`${Class} ${loading ? "hidden" : "block"}`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </>
    );
};

export default Image;
