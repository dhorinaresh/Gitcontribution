import { useState, useEffect } from "react";

export const useFetch = (fetchFunction, ...args) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFunction(...args);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [fetchFunction, args]);

  return { data, loading };
};
