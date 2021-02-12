import { useState, useEffect, useCallback } from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( async(url, options) => {
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          //setResponse(json);
          setIsLoading(false);
          return json;
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
    });

    const clearError = () => setError(null);
    return { request, error, isLoading, clearError };
}