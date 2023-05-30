import { useEffect, useState } from "react";
import {  CountryDetailTypes } from "../types";

interface FetchDataResult {
  data: CountryDetailTypes | [];
  error: boolean;
  loading: boolean;
}

const useFetchData = (url: string): FetchDataResult => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    const controller = new AbortController();

    fetchData();
    return () => {
      controller.abort();
      console.log("Fetch Aborted... ");
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;
