import { useEffect, useState } from "react";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url:string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
	  // console.log(data[0])
    } catch (err) {}
    setLoading(false);
    setError(true);
  }

  useEffect(()=>{
	fetchData(url)
  }, [url])

  return {data, error, pending: loading }
};


export default useFetchData

