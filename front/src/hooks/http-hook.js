import { useState, useEffect, useCallback } from "react";

import axios from "axios";


export const useHttpOld = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async(url, options) => {
      setIsLoading(true);
      try {
        const json = await axios.get(url, options);
        //const json = await res.json();
        //setResponse(json);
        setIsLoading(false);
        return json.data;
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
  });

  const clearError = () => setError(null);
  return { request, error, isLoading, clearError };
}


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

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setResponse(json);
          setIsLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error, isLoading };
};

export default useFetch;