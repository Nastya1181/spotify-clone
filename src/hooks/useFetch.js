/* import { useEffect, useState } from "react";
import { setEnvironmentData } from "worker_threads";

function useFetch(url, fetchOptions, dataCallback) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState (false);
  const [error, setError] = useState (false);


  async function handleFetch(url, fetchOptions, dataCallback) {
      setIsError (false);
      setIsLoading (true);
  try {
    let response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(response.status);
    }
    let dataJson = await response.json();
    result = dataCallback(dataJson);
    setItems([...items, ...result]);
  } catch (err) {
      setIsError (true);
    switchError(err.message); 
  }
  setIsLoading (false);
}
useEffect(() => {
  handleFetch();
}, []);
return {items, loading, error};
} */
/* function useGetItemsQuery(url, fetchOptions, dataCallback) {
    const [items, setItems] = useState([]);
    const [next, setNext] = useState('');
    const [loading, setLoading] = useState (false);
    const [error, setError] = useState (false);


    async function handleFetch(url, fetchOptions, dataCallback) {
        setIsError (false);
        setIsLoading (true);
    try {
      let response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(response.status);
      }
      let dataJson = await response.json();
      result = dataCallback(dataJson);
      setItems([...items, ...result]);
    } catch (err) {
        setIsError (true);
      switchError(err.message); 
    }
    setIsLoading (false);
}
useEffect(() => {
    handleFetch();
}, []);
return {items, loading, error};
  } */
  