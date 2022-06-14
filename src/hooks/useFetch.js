import { useState, useEffect } from "react";
import { switchError } from "../Api";

export default function useFetch(startUrl, itemsType) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetch(startUrl);
    return () => {
      setData(null);
    };
  }, [startUrl]);

  function handleFetch(url) {
    if (localStorage.getItem("access_token")) {
      setLoading(true);
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError(err);
          switchError(err.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return { data, loading, error, refetch: handleFetch};
}
